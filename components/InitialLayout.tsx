import { useAuth } from '@clerk/clerk-expo'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { StatusBar } from 'react-native'

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth()
    const segments = useSegments()
    const router = useRouter()

    useEffect(() => {
        if (!isLoaded) return

        const inAuthScreen = segments[0] === '(auth)'

        if (!isSignedIn && !inAuthScreen) {
            router.replace('../(auth)/login')
        } else if (isSignedIn && inAuthScreen) {
            router.replace('../(tabs)')
        }
    }, [isLoaded, isSignedIn, router, segments])

    if (!isLoaded) return null

    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <Stack screenOptions={{ headerShown: false }} />
        </>
    )
}