export default function MagiaDoJSX()  {

    const magia = <strong>HTML DENTRO DO JS</strong>
    const tecnologia = "React e Next.js"
    return(
        <div className="bg-blue-100 p-3 m-3 rounded-x1 text-black ">
            <p>Este é o meu componente de React</p>
            <p>{magia}</p>
            <p>{tecnologia}</p>
        </div>
    )
}