"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Button from "@/components/Button"

export default function VerifyPage({ params }: { params: Promise<{ key: string }> }) {
    const { key } = use(params)
    const router = useRouter()

    const { isError, error, isSuccess } = useQuery({
        queryKey: ["verify", key],
        retry: false,
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/verify/${key}`)
            if (!res.ok) throw new Error("invalid")
            const data = await res.json()
            if (data.message === "User already verified") throw new Error("already_verified")
            setTimeout(() => router.push("/login"), 3000)
            return data
        }
    })

    // Already verified result
    if (isError) {
        const message = (error as Error).message
        if (message === "already_verified") return (
            <div className="flex flex-col gap-s items-center top-[50%] translate-y-[50%]">
                <p className="text-xl text-center">Din konto er allerede verificeret.</p>
                <Button href="/login">Gå til login</Button>
            </div>
        )
        return <p className="text-xl text-center">Verificering fejlede. Linket er ugyldigt eller udløbet.</p>
    }

    if (!isSuccess) return null


    return (
        // Verified succesfully result
        <div className="flex flex-col gap-3xl items-center top-[50%] translate-y-[50%]">
            <svg xmlns="http://www.w3.org/2000/svg" width="151" height="151" viewBox="0 0 151 151" fill="none">
                <path d="M69.2172 103.09C67.8413 103.09 66.522 102.498 65.5493 101.444L38.8623 72.5501C38.3806 72.0283 37.9984 71.409 37.7377 70.7273C37.477 70.0456 37.3428 69.315 37.3428 68.5772C37.3428 67.087 37.8894 65.6579 38.8623 64.6043C39.8353 63.5506 41.1549 62.9586 42.5309 62.9586C43.9068 62.9586 45.2265 63.5506 46.1994 64.6043L69.2172 89.526L134.394 18.9436C134.873 18.4122 135.446 17.9892 136.077 17.699C136.709 17.4088 137.388 17.2572 138.074 17.253C138.76 17.2488 139.44 17.392 140.075 17.6744C140.709 17.9568 141.286 18.3728 141.771 18.8982C142.257 19.4236 142.641 20.048 142.902 20.7353C143.163 21.4226 143.295 22.1592 143.291 22.9023C143.287 23.6454 143.147 24.3803 142.88 25.0644C142.612 25.7486 142.221 26.3684 141.731 26.888L72.8863 101.444C72.4046 101.966 71.8325 102.38 71.203 102.662C70.5734 102.945 69.8986 103.09 69.2172 103.09Z" fill="#06C167" />
                <path d="M75.4679 151C58.0517 150.991 41.174 144.961 27.6943 133.931C14.2146 122.902 4.96183 107.55 1.50359 90.4781C-1.95465 73.4061 0.594341 55.6633 8.71869 40.2558C16.843 24.8483 30.0432 12.7236 46.0826 5.93584C57.8594 0.971363 70.7024 -0.925996 83.4114 0.421071C96.1203 1.76814 108.28 6.31566 118.755 13.6387C119.359 14.0622 119.874 14.6005 120.27 15.223C120.666 15.8455 120.936 16.5399 121.064 17.2666C121.191 17.9933 121.175 18.738 121.015 19.4583C120.855 20.1785 120.554 20.8602 120.131 21.4644C119.707 22.0686 119.169 22.5834 118.547 22.9795C117.924 23.3757 117.23 23.6453 116.503 23.773C115.777 23.9008 115.032 23.8842 114.312 23.7241C113.592 23.5641 112.91 23.2637 112.306 22.8402C101.519 15.261 88.6507 11.2077 75.4679 11.2368C40.0381 11.2368 11.2146 40.0648 11.2146 75.5C11.2146 110.935 40.0381 139.763 75.4679 139.763C110.898 139.763 139.721 110.935 139.721 75.5C139.735 67.4373 138.225 59.4448 135.269 51.9435C134.983 51.2539 134.837 50.5141 134.84 49.7674C134.842 49.0207 134.994 48.282 135.285 47.5945C135.577 46.9071 136.002 46.2846 136.537 45.7635C137.072 45.2425 137.705 44.8333 138.4 44.5598C139.095 44.2864 139.837 44.1542 140.583 44.171C141.33 44.1878 142.065 44.3532 142.747 44.6576C143.429 44.9621 144.043 45.3994 144.554 45.9439C145.065 46.4885 145.462 47.1295 145.722 47.8294C150.237 59.2791 151.883 71.6592 150.518 83.8911C149.154 96.1229 144.819 107.835 137.892 118.008C130.965 128.181 121.655 136.505 110.775 142.255C99.8949 148.006 87.7738 151.008 75.4679 151Z" fill="#06C167" />
            </svg>
            <p className="text-xl text-center">Du er nu medlem! <br />Kør direkte til vaskehallen og kom i gang.</p>
        </div>
    )
}