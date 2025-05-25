import { COLORS } from '@/constants/theme'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { styles } from '@/styles/feed.styles'
import { Ionicons } from '@expo/vector-icons'
import { useMutation, useQuery } from 'convex/react'
import { useState } from 'react'
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import Comment from './Comments'
import { Loader } from './Loader'

type ICommentsModal = {
    postId: Id<'posts'>
    visible: boolean
    onClose: () => void
}

export default function CommentsModal({
    postId,
    visible,
    onClose,
}: ICommentsModal) {
    const [newComment, setNewComment] = useState('')
    const comments = useQuery(api.comments.getComments, { postId })
    const addComment = useMutation(api.comments.addComment)

    const handleAddComment = async () => {
        if (!newComment.trim()) return // Prevent empty comments
        try {
            await addComment({ content: newComment, postId })

            setNewComment('') // Clear input
        } catch (error) {
            console.error('Error adding comment:', error)
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalContainer}
            >
                {/* Header */}
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Comments</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Comments List */}
                {comments === undefined ? (
                    <Loader />
                ) : (
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <Comment comment={item} />}
                        contentContainerStyle={styles.commentsList}
                    />
                )}

                <View style={styles.commentInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment..."
                        placeholderTextColor={COLORS.grey}
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                    />
                    <TouchableOpacity
                        onPress={handleAddComment}
                        disabled={!newComment.trim()}
                    >
                        <Text
                            style={[
                                styles.postButton,
                                !newComment.trim() && styles.postButtonDisabled,
                            ]}
                        >
                            Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}