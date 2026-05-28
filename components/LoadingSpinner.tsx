export default function LoadingSpinner() {
    return (
        <div className="h-screen grid place-content-center">
            <div className="w-xl h-xl border-3 border-grey-10 border-t-green-white-background rounded-full animate-spin" />
        </div>
    )
}
