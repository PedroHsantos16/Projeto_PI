import { TriangleAlert, CheckCheck, CircleAlert, X } from "lucide-react"

export default function BoxNotificacao({mensagem, subtexto, cor, onClose}){

    if(cor === 1) return (
        <div className="box-noti">
            <div className="box-noti__icon box-noti__icon__red">
                <TriangleAlert size={30}/>
            </div>
            <p className="box-noti__text">
                    {mensagem} <br />
                <div className="box-noti__text-small">
                    {subtexto}
                </div>
            </p>
            <button onClick={onClose}>
                <X size={30}/>
            </button>
        </div>
    )

    else if(cor === 2) return(
        <div className="box-noti">
            <div className="box-noti__icon box-noti__icon__green">
                <CheckCheck size={30}/>
            </div>
            <p className="box-noti__text">
                    {mensagem} <br />
                <div className="box-noti__text-small">
                    {subtexto}
                </div>
            </p>
            <button onClick={onClose}>
                <X size={30}/>
            </button>
        </div>
    )

    else if(cor === 3) return(
        <div className="box-noti">
            <div className="box-noti__icon box-noti__icon__gray">
                <CircleAlert size={30}/>
            </div>
            <p className="box-noti__text">
                    {mensagem} <br />
                <div className="box-noti__text-small">
                    {subtexto}
                </div>
            </p>
            <button onClick={onClose}>
                <X size={30}/>
            </button>
        </div>
    )
}