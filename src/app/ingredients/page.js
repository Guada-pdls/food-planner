import Ingredients from "@/Components/Ingredients/Ingredients"
import Link from "next/link"

const page = () => {
  return (
    <main className="pb-30">
      <header className="flex items-center justify-between gap-4 mb-10">
        <h1 className="title">Ingredientes</h1>
        <Link href="/barcode-scanner" className="btn btn-secondary btn-outline">
          Escanear código de barras
        </Link>
      </header>
      <Ingredients />
    </main>
  )
}

export default page