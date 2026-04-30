import Button from "@/components/Button"

export default function Home() {
  return (
    <div className="">
      <main className="flex gap-xs flex-wrap">
        <Button href="/test" icon={false}>Button</Button>
        <Button>Button</Button>
        <Button disabled>Button</Button>
        <Button variant="secondary" icon={false}>Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="dark" icon={false}>Button</Button>
        <Button variant="dark" size="lg">Button</Button>
      </main>
    </div>
  );
}
