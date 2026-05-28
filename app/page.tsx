import Button from "@/components/Button"
import Image from 'next/image'


export default function Home() {
  return (
    <main className="bg-black p-xs h-screen flex flex-col justify-between">
      <div></div>
      <Image className="justify-self-center self-center" src="/icons/white_logo.svg" alt="wash world logo" width={209} height={87} />
      <div className="grid gap-xs">
        <Button href="/signup" className="justify-center" icon={false}>Bliv medlem</Button>
        <Button href="/login" className="justify-center" icon={false} variant="secondary">Login</Button>
      </div>
    </main>
  );
}
