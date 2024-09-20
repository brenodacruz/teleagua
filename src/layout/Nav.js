import { Link, useLocation  } from "react-router-dom";

export default function Nav(props){
    const location = useLocation()
    return(
        <Link to={props.to} >
            <div  className={`flex flex-row items-center justify-start text-white gap-5 w-full px-10 py-5 ${location.pathname === props.to ? "bg-blue-600" : ""}`}>
                <div className="bg-white rounded-md p-1"><img src={`./img/${props.name}.png`} alt={props.name} className="w-10"></img></div>
                <h1 className="font-light text-xl">{props.title}</h1>
            </div>
        </Link>
    )
}
