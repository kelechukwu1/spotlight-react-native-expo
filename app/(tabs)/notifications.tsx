import Notification from '@/components/Notifications'
import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { styles } from '@/styles/notification.styles'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import React from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { Loader } from '../../components/Loader'

export default function Notifications() {
    const notifications = useQuery(api.notifications.getNotifications)

    if (notifications === undefined) return <Loader />
    if (notifications.length === 0) return <NoNotificationsFound />
    return (
        <SafeAreaView className='flex-1'>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => <Notification notification={item} />}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    )
}

function NoNotificationsFound() {
    return (
        <SafeAreaView className='flex-1'>
            <View style={[styles.container, styles.centered]}>
                <Ionicons name="notifications-outline" size={48} color={COLORS.primary} />
                <Text style={{ fontSize: 20, color: COLORS.white }}>
                    No notifications yet
                </Text>
            </View>
        </SafeAreaView>
    )
}