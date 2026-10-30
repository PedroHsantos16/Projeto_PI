import { TriangleAlert, CheckCheck, CircleAlert, X } from "lucide-react"

export default function BoxNotificacao({mensagem, cor, onClose}){

    if(cor === 1) return (
        <div className="box-noti box-noti__red">
            <TriangleAlert size={30} color="#A73141"/>
            <p className="box-noti__text">
                {mensagem}
            </p>
            <button onClick={onClose}>
                <X size={30} color="#A73141"/>
            </button>
        </div>
    )

    else if(cor === 2) return(
        <div className="box-noti box-noti__green">
            <CheckCheck size={30} color="#B1CF5F"/>
            <p className="box-noti__text">
                {mensagem}
            </p>
            <button onClick={onClose}>
                <X size={30} color="#B1CF5F"/>
            </button>
        </div>
    )

    else if(cor === 3) return(
        <div className="box-noti box-noti__gray">
            <CircleAlert size={30} color="#1d191699"/>
            <p className="box-noti__text">
                {mensagem}
            </p>
            <button onClick={onClose}>
                <X size={30} color="#1d191699"/>
            </button>
        </div>
    )
}