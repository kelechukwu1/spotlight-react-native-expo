import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { styles } from '@/styles/feed.styles'
import { useQuery } from 'convex/react'
import { Image } from 'expo-image'
import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Loader } from '../../components/Loader'

export default function Bookmarks() {
    const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts)

    if (bookmarkedPosts === undefined) return <Loader />
    if (bookmarkedPosts.length === 0) return <NoBookmarksFound />

    return (
        <SafeAreaView className='flex-1'>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Bookmarks</Text>
                </View>

                {/* POSTS */}

                <ScrollView
                    contentContainerStyle={{
                        padding: 8,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    {bookmarkedPosts.map((post) => {
                        if (!post) return null
                        return (
                            <View key={post._id} style={{ width: '33.33%', padding: 1 }}>
                                <Image
                                    source={post.imageUrl}
                                    style={{ width: '100%', aspectRatio: 1 }}
                                    contentFit="cover"
                                    transition={200}
                                    cachePolicy="memory-disk"
                                />
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

function NoBookmarksFound() {
    return (
        <SafeAreaView className='flex-1'>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.background,
                }}
            >
                <Text style={{ color: COLORS.primary, fontSize: 22 }}>
                    No Bookmarked posts
                </Text>
            </View>
        </SafeAreaView>
    )
}