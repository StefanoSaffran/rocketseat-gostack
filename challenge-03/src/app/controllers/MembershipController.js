import * as Yup from 'yup';
import { addMonths, parseISO, isBefore } from 'date-fns';
import Membership from '../models/Membership';
import Plan from '../models/Plan';
import Student from '../models/Student';

import ConfirmationMail from '../jobs/ConfirmationMail';
import Queue from '../../lib/Queue';

class MembershipController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      plan_id: Yup.number().required(),
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { start_date, plan_id, student_id } = req.body;
    const parsedStartDate = parseISO(start_date);

    const checkPlanExists = await Plan.findByPk(plan_id);

    if (!checkPlanExists) {
      return res.status(401).json({ error: 'Plan not found' });
    }

    const checkStudentExists = await Student.findByPk(student_id);

    if (!checkStudentExists) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const checkStudentHasMembership = await Membership.findOne({
      where: {
        student_id,
      },
    });

    if (checkStudentHasMembership) {
      return res
        .status(400)
        .json({ error: 'Student already has a membership' });
    }

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const end_date = addMonths(parsedStartDate, checkPlanExists.duration);
    const price = checkPlanExists.price * checkPlanExists.duration;

    const membership = await Membership.create({
      student_id,
      plan_id,
      start_date: parsedStartDate,
      end_date,
      price,
    });

    const membershipInfo = await Membership.findAll({
      where: { student_id: membership.student_id },
      attributes: ['start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    console.log(membershipInfo);
    await Queue.add(ConfirmationMail.key, {
      membershipInfo,
    });

    return res.json(membership);
  }

  async index(req, res) {
    const memberships = await Membership.findAll();

    return res.json(memberships);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.string(),
      plan_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { start_date, plan_id } = req.body;
    const parsedStartDate = parseISO(start_date);

    /**
     * Search for the student membership
     */
    const membership = await Membership.findByPk(req.params.studentId);

    if (!membership) {
      return res
        .status(400)
        .json({ error: 'Student does not have a membership' });
    }

    if (!membership.expired) {
      return res
        .status(400)
        .json({ error: 'Only expired membership can be updated' });
    }

    console.log(parseISO(start_date), new Date());
    if (start_date && isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const checkPlanExists = await Plan.findByPk(plan_id);

    if (!checkPlanExists) {
      return res.status(401).json({ error: 'Plan not found' });
    }

    const end_date = addMonths(parsedStartDate, checkPlanExists.duration);
    const price = checkPlanExists.price * checkPlanExists.duration;

    const updatedMembership = await membership.update({
      student_id: req.params.studentId,
      plan_id,
      start_date: parsedStartDate,
      end_date,
      price,
    });

    return res.json(updatedMembership);
  }

  async delete(req, res) {
    const membership = await Membership.findByPk(req.params.studentId);

    if (!membership) {
      return res.status(400).json({ error: 'Student membership not found' });
    }

    await membership.destroy();

    return res.status(204).send();
  }
}

export default new MembershipController();
