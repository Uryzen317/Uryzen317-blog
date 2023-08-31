'use client'

import Image from "next/image"
import Link from "next/link"

export default function () {
    return (
        <footer className="bg-gray-950 w-full h-14 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-sm">All rights reserved for <Link href={'https://uryzen317.ir'}>Uryzen317</Link></p>
            <div className="desc text-gray-400 text-sm flex items-center gap-1 grayscale">
                <p>powered by: </p>
                <Image className="w-4 h-4" src={'/next.png'} width={100} height={100} alt="uryzen317 blog uses Nextjs for front end code."></Image>
                <Image className="w-4 h-4" src={'/nest.svg'} width={100} height={100} alt="uryzen317 blog uses Nestjs for back end code."></Image>
                <Image className="w-4 h-4" src={'/prisma.png'} width={100} height={100} alt="uryzen317 blog uses Prisma as a database ORM."></Image>
            </div>
        </footer>
    )
}