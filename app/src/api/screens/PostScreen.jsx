// src/screens/PostScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPost, getComments } from '../jsonPlaceholder';

const PostScreen = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    const response = await getPost(id);
    setPost(response.data);
  };

  const fetchComments = async () => {
    const response = await getComments(id);
    setComments(response.data);
  };

  if (!post) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.commentsTitle}>Comments:</Text>
      <FlatList
        data={comments}
        keyExtractor={(comment) => comment.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentEmail}>{item.email}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    // color:  '#fff',
    color: '#10B981',
   
  },
  body: {
    fontSize:18,
    marginVertical: 10,

  },
  commentsTitle: {
    fontSize: 24,
    marginTop: 20,
    color: '#10B981',



  },
  comment: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,

  },
  commentEmail: {
    fontWeight: 'bold',
  },
});

export default PostScreen;
