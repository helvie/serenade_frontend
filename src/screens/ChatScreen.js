import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import React from "react";
import globalStyles from "../../utils/globalStyles";
import ChatUserAvatar from "../components/ChatUserAvatar";
import ChatRecipientMessage from "../components/ChatRecipientMessage";
import ChatSenderMessage from "../components/ChatSenderMessage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChatScreen = () => {
  // Initialization calculation scrollview height for display the end
  //-------------------------------------------------------------

  const scrollViewRef = useRef();
  const [isScrollViewAtEnd, setIsScrollViewAtEnd] = useState(false);
  const [messageText, setMessageText] = useState("");

  //-------------------------------------------------------------

  const [messages, setMessages] = useState([
    {
      firstname: "Alice",
      message: "Salut Bob, comment vas-tu ?",
      date: "2022-04-10T14:30:00Z",
    },
    {
      firstname: "Bob",
      message: "Salut Alice, ça va bien, merci ! Et toi ?",
      date: "2022-04-10T14:32:00Z",
    },
    {
      firstname: "Alice",
      message: "Je vais bien aussi, merci. ",
      date: "2022-04-10T14:35:00Z",
    },
    {
      firstname: "Alice",
      message: "Quoi de neuf ?",
      date: "2022-04-10T14:35:00Z",
    },
    {
      firstname: "Bob",
      message: "Pas grand-chose, et toi ?",
      date: "2022-04-10T14:38:00Z",
    },
    {
      firstname: "Alice",
      message: "Rien de spécial non plus. Tu as des projets pour ce week-end ?",
      date: "2022-04-10T14:40:00Z",
    },
    {
      firstname: "Bob",
      message:
        "Pas vraiment, je pense que je vais rester à la maison. Et toi ?",
      date: "2022-04-11T14:42:00Z",
    },
    {
      firstname: "Alice",
      message:
        "Je vais probablement sortir avec des amis samedi soir. Tu veux te joindre à nous ?",
      date: "2022-04-20T14:45:00Z",
    },
    {
      firstname: "Bob",
      message: "Je ne sais pas encore, je te tiendrai au courant. Tu vas où ?",
      date: "2022-04-20T14:48:00Z",
    },
    {
      firstname: "Alice",
      message: "On va au restaurant italien près de chez moi, à 20h.",
      date: "2022-04-20T14:50:00Z",
    },
    {
      firstname: "Alice",
      message: "On va au restaurant italien près de chez moi, à 20h.",
      date: "2022-04-20T14:50:00Z",
    },
    {
      firstname: "Bob",
      message: "OK, je te tiens au courant. À plus tard !",
      date: "2022-04-20T14:52:00Z",
    },
    {
      firstname: "Alice",
      message: "À plus tard !",
      date: "2022-04-20T14:53:00Z",
    },
    {
      firstname: "Bob",
      message:
        "Salut Alice, finalement je ne pourrai pas venir ce soir. Désolé.",
      date: "2022-04-21T10:00:00Z",
    },
    {
      firstname: "Alice",
      message: "Pas de soucis, une prochaine fois alors !",
      date: "2022-04-21T10:02:00Z",
    },
    {
      firstname: "Bob",
      message: "Oui, absolument. Tu me raconteras comment c'était.",
      date: "2022-04-21T10:15:00Z",
    },
  ]);

  // Diplay end of scrollview at the first opening
  //-------------------------------------------------------------

  useEffect(() => {
    if (isScrollViewAtEnd) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [isScrollViewAtEnd]);

  const handleScrollViewLayout = () => {
    setIsScrollViewAtEnd(true);
  };

  //--------------------------------------------------------------

  const connected = true;
  const avatarImage = { img: require("../../assets/avatar.jpg") };
  const avatarDisplay = true;
  const avatarMsgSize = 40;
  const avatarHeaderSize = 70;

  // Send messages
  //--------------------------------------------------------------

  const handleSendMessage = () => {
    console.log(messageText);
    setMessageText("");
  };

  // Dislike
  //--------------------------------------------------------------

  const handleDismatch = () => {
    console.log("handleDismatch");
  };

  // Initialisation messages views
  //--------------------------------------------------------------

  const allMessages = messages.map((data, i) => {
    const date = new Date(data.date);
    const hours = date.getHours() + ":" + date.getMinutes() + " am";

    if (data.firstname == "Alice") {
      return (
        <ChatRecipientMessage
          key={i}
          date={hours}
          text={data.message}
          connected={connected}
          size={avatarMsgSize}
          avatarImage={avatarImage.img}
          avatarDisplay={avatarDisplay}
        />
      );
    } else {
      return <ChatSenderMessage key={i} date={hours} text={data.message} />;
    }
  });

  //--------------------------------------------------------------

  return (
    <View style={globalStyles.screen}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View className="w-1/6">
            <Header />
          </View>

          <View style={styles.user} className="w-3/6 items-center">
            <ChatUserAvatar
              connected={connected}
              size={avatarHeaderSize}
              avatarImage={avatarImage.img}
              avatarDisplay={avatarDisplay}
            />
          </View>
          <View className="w-1/6 items-center">
            <TouchableOpacity
              onPress={() => handleDismatch()}
              style={styles.dislikeIcon}
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

        <Text style={styles.headerText}>Elisabeth</Text>
        <View style={styles.headerBorder} />
      </View>

      <ScrollView
        style={styles.scroll}
        className="p-6"
        ref={scrollViewRef}
        onLayout={handleScrollViewLayout}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {allMessages}
      </ScrollView>

      <View keyboardShouldPersistTaps="handled" style={styles.sendContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  // header
  //----------------------------------------

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
  //----------------------------------------

  scroll: {
    flex: 1,
  },

  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },

  // send messages container
  //----------------------------------------

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
