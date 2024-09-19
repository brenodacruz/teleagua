export default function Nav(props){
    return(
        <div className="flex flex-row items-center justify-start text-white gap-5">
            <div className="bg-white rounded-md p-1"><img src={`./img/${props.name}.png`} alt={props.name} className="w-10"></img></div>
            <h1 className="font-light text-xl">{props.title}</h1>
        </div>
    )
}
