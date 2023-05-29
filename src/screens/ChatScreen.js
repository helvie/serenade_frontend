import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import UserAvatar from "../components/UserAvatar";
import ChatRecipientMessage from "../components/ChatRecipientMessage";
import ChatSenderMessage from "../components/ChatSenderMessage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { postANewMessage } from "../../utils/authenticateUser";
import { useSelector } from "react-redux";
import io from "socket.io-client/dist/socket.io";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const socket = io("https://serenade.onrender.com/");

const ChatScreen = () => {
  //Take advantage of the useRoute hook to get the match data from the MessagesScreen
  const route = useRoute();
  // Get the match data from the messages screen (the user clicked on a match)
  const matchData = route.params.match;

  const userToken = useSelector((state) => state.user.token);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Initialisation of the messages
  const [messages, setMessages] = useState(matchData.messages);

  const scrollViewRef = useRef();

  const [messageText, setMessageText] = useState("");

  // Join the appropriate room between the two users
  socket.emit("joinRoom", matchData.matchId);

  // Scroll to the end of the ScrollView
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  // Scroll to the end when messages change or component mounts
  useEffect(() => {
    scrollToBottom();
  }, [messages, isKeyboardVisible]);

  // Scroll to the end when the keyboard appears
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // push new message received from socketIo in our messages state
  useEffect(() => {
    socket.on("messageReceived", (data) => {
      setMessages((previousMessages) => [...previousMessages, data]);
    });
  }, [socket]);

  const handleSendMessage = async () => {
    const messageData = {
      sender: userToken,
      content: messageText,
      date: new Date(),
    };

    // If the message is empty, we don't send it
    if (messageText.trim() === "") return;

    setMessageText("");

    const data = await postANewMessage({
      matchId: matchData.matchId,
      messageData: messageData,
    });

    if (data.result === true) {
      socket.emit("messageSend", {
        messageData,
        matchId: matchData.matchId,
      });
      setMessages((previousMessages) => [...previousMessages, messageData]);
      return;
    } else {
      console.log(data.message);
    }
  };

  // Dismatch the user (delete the match collection in db and redirect to home)
  const handleDismatch = () => {
    alert(
      "Sorry this is an MVP we didn't have time to do this feature, at least you can continue to speak with your crush 😂😂"
    );
  };

  // Initialisation messages views
  const allMessages = messages.map((data, i) => {
    const date = new Date(data.date);
    let moment = "";
    if (date.getHours() > 12) {
      moment = " pm";
    } else {
      moment = " am";
    }
    const time = date.getHours() + ":" + date.getMinutes() + `${moment}`;

    if (data.sender !== userToken) {
      return (
        <ChatRecipientMessage
          key={i}
          date={time}
          text={data.content}
          connected={true}
          size={40}
          avatarImage={matchData.matchedUser.pictures[0]}
          avatarDisplay={true}
        />
      );
    } else {
      return <ChatSenderMessage key={i} date={time} text={data.content} />;
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ ...globalStyles.screen, paddingTop: 30 }}
    >
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View className="w-1/6">
            <Header />
          </View>

          <View style={styles.user} className="w-3/6 items-center">
            <UserAvatar
              connected={true}
              size={70}
              avatarImage={matchData.matchedUser.pictures[0]}
              avatarDisplay={true}
            />
          </View>
          <View className="w-1/6 items-center">
            <TouchableOpacity
              onPress={() => handleDismatch()}
              className="w-7 h-7 bg-white rounded-full justify-center items-center"
            >
              <MaterialCommunityIcons
                name="heart-broken"
                size={24}
                color={globalStyles.primaryColor}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.headerText}>{matchData.matchedUser.name}</Text>
        <View style={styles.headerBorder} />
      </View>

      <ScrollView
        style={styles.scroll}
        ref={scrollViewRef}
        contentContainerStyle={[
          isKeyboardVisible ? { paddingBottom: 130 } : { paddingBottom: 30 },
          styles.scrollContentContainer,
        ]}
        className="px-6 pt-6"
      >
        {allMessages}
      </ScrollView>

      <View style={styles.sendContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="paperclip"
            style={styles.papeclip}
            color="#EC7955"
            size={26}
          />
          <TextInput
            onChangeText={(value) => setMessageText(value)}
            placeholder={"Type a message"}
            value={messageText}
            style={[styles.input, globalStyles.mainTextBlack]}
          />
          <TouchableOpacity
            onPress={() => handleSendMessage()}
            style={styles.sendButton}
          >
            <FontAwesome name="send" color="#ffffff" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // header
  topHeader: {
    width: "100%",
  },

  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },

  topHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 25,
    paddingLeft: 25,
    alignItems: "center",
  },

  headerText: {
    color: "#ffffff",
    fontSize: 18,
    marginTop: 5,
  },

  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    width: "100%",
    height: 10,
  },

  // messages content
  scroll: {
    flex: 1,
  },

  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  // send messages container
  sendContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },

  inputContainer: {
    width: 327,
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: "auto",
    background: "transparent",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#ffffff",
    borderRadius: 32,
  },

  input: {
    width: "70%",
    borderRadius: 30,
    color: "#1D2635",
  },

  sendButton: {
    borderRadius: 50,
    backgroundColor: "#EC7955",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 32,
    color: "#EC7955",
  },
});

export default ChatScreen;
