import Button from "./Button"

export default function IfNotUser() {
return (
    <main className="mx-xs h-screen grid place-content-center">
        <div className="grid gap-s">
        <h1 className="text-3xl text-center">Din session udløbet.</h1>
        <Button href="/login">Gå til log ind</Button>
        </div>
    </main>
)
}
