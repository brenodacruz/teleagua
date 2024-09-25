import { NumericFormat } from 'react-number-format';

export default function MoneyInput(props) {
    return (
        <NumericFormat
            value={props.value} // Passa o valor controlado pelo estado
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            fixedDecimalScale={true}
            decimalScale={2}
            allowNegative={false}
            placeholder={props.placeholder}
            className={props.className}
            onValueChange={(values) => {
                const { floatValue } = values; // Captura o valor numérico
                props.onChange(floatValue); // Chama a função onChange do pai
            }}
        />
    );
}
