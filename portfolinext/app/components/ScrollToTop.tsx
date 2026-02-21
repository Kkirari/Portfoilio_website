'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ScrollToTop() {
    const router = useRouter()

    useEffect(() => {
        // Force manual scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }

        // Scroll to top on mount with a slight delay to ensure layout is ready
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0)
        }, 10)

        return () => clearTimeout(timeout)
    }, [])

    return null
}
