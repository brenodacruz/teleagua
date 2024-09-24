import { NumericFormat } from 'react-number-format';
export default function MoneyInput(props){
    return (
        <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        fixedDecimalScale={true}
        decimalScale={2} 
        allowNegative={false} 
        placeholder={props.placeholder}
        className={props.className}
        />
    );

}