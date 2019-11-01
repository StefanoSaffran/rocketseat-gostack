import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  margin: 15px;
`;

export const CartList = styled.View`
  border: 2px solid #ddd;
  border-radius: 4px;
`;

export const Product = styled.View``;

export const ProductInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  height: 80px;
  width: 80px;
`;

export const ProductDelete = styled.TouchableOpacity`
  padding: 6px;
`;

export const Details = styled.View`
  flex: 1;
  margin-left: 10px;
  padding: 10px;
`;

export const Title = styled.Text``;

export const Price = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
`;

export const ProductControls = styled.View`
  flex-direction: row;
  align-items: center;
  background: #ddd;
  padding: 8px;
  border-radius: 4px;
`;

export const AmountButton = styled.TouchableOpacity``;

export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 52px;
`;

export const ProductSubtotal = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

export const TotalContainer = styled.View`
  margin-top: 30px;
`;

export const TotalText = styled.Text`
  text-align: center;
  color: #999;
  font-weight: bold;
`;

export const TotalAmount = styled.Text`
  font-size: 30px;
  font-weight: bold;
  padding: 5px 0 30px;
  text-align: center;
`;

export const Order = styled.View`
  border-radius: 4px;
  background: ${darken(0.03, '#7159c1')};
  padding: 12px 0;
`;

export const OrderText = styled.Text`
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 18px;
`;
