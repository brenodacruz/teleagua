export default function Input(props){
    return(
        <input 
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        className="rounded-xl px-5 py-2 w-96"
        ></input>
    )
}