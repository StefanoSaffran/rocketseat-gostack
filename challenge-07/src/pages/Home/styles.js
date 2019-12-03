import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  background: #141419;
`;

export const Product = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;
export const Image = styled.Image`
  height: 200px;
  width: 200px;
`;
export const Title = styled.Text`
  font-size: 16px;
`;
export const Price = styled.Text`
  margin: 14px 0;
  font-size: 20px;
  margin-bottom: 14px;
  font-weight: bold;
`;

export const AddCartButton = styled.TouchableOpacity`
  background: #7159c1;
  flex-direction: row;
  border-radius: 4px;
  margin-top: auto;
  align-items: center;
`;
export const AddCartButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;

export const ProductAmount = styled.View`
  padding: 12px;
  background: ${darken(0.03, '#7159c1')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ProductAmountText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;
