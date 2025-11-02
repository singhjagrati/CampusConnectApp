import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Modal, Pressable } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const TEAM = [
  { name: "Aisha Varma", role: "Lead Developer", color: "#6c5ce7", linkedin: "https://linkedin.com/" },
  { name: "Arjun Mehta", role: "UI/UX Designer", color: "#36D1C4", linkedin: "https://linkedin.com/" },
  { name: "Sara Birla", role: "Community Manager", color: "#fad961", linkedin: "https://linkedin.com/" }
];

export default function AboutScreen() {
  const [faqVisible, setFaqVisible] = useState(false);

  return (
    <View style={styles.bg}>
      {/* Simulated gradient background sweep */}
      <View style={styles.gradientBg} />
      <View style={styles.card}>
        <View style={styles.logoAbs}>
          <Text style={styles.logo}>🎓</Text>
        </View>
        <Text style={styles.title}>Campus Connect</Text>
        <Text style={styles.text}>
          Discover, register, and join campus events with a single tap.
        </Text>
        <Text style={styles.text}>Built with <Text style={{color:'#c03'}}>❤️</Text> React Native.</Text>
        <View style={styles.hr} />

        <View style={styles.teamBlock}>
          <Text style={styles.teamHeader}>Meet the Team</Text>
          {TEAM.map((m, i) => (
            <View style={styles.memberRow} key={m.name}>
              <View style={[styles.avatar, {backgroundColor: m.color+"25"}]}>
                <Text style={{color: m.color, fontWeight:"bold"}}>
                  {m.name.split(" ").map(str=>str[0]).join("").slice(0,2).toUpperCase()}
                </Text>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.memName}>{m.name}</Text>
                <Text style={styles.memRole}>{m.role}</Text>
              </View>
              <TouchableOpacity onPress={()=>Linking.openURL(m.linkedin)}>
                <FontAwesome name="linkedin-square" size={27} color={m.color} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.faqBtn} onPress={()=>setFaqVisible(true)}>
          <Ionicons name="help-circle" size={20} color="#6a33a5"/>
          <Text style={styles.faqText}>FAQ & Help</Text>
        </TouchableOpacity>
        
        <View style={styles.socialBlock}>
          <Text style={styles.connectTxt}>Connect with us:</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com/")}>
              <FontAwesome name="instagram" size={28} color="#be21b6" style={styles.socialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/")}>
              <FontAwesome name="twitter" size={28} color="#1da1f2" style={styles.socialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com/")}>
              <FontAwesome name="facebook" size={28} color="#3b5998" style={styles.socialIcon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:support@campusconnect.com")}>
              <Ionicons name="mail" size={28} color="#5c258d" style={styles.socialIcon}/>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => Linking.openURL("https://your-app-link.com/")}
        >
          <Ionicons name="globe" size={26} color="#fff"/>
          <Text style={styles.linkBtnText}>Visit our website</Text>
        </TouchableOpacity>
        <View style={styles.madeWith}>
          <Ionicons name="logo-react" size={18} color="#6a33a5"/>
          <Text style={{marginLeft:7, color:'#6a33a5'}}>Made for learning. v1.0.0</Text>
        </View>
      </View>
      <Modal visible={faqVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            <Text style={styles.faqQ}>How do I register for an event?</Text>
            <Text style={styles.faqA}>Just tap on an event. Click “Register” and it will show up in “Registered Events”.</Text>
            <Text style={styles.faqQ}>Can I share or favorite events?</Text>
            <Text style={styles.faqA}>Yes! Each event has a share button and favorites feature.</Text>
            <Pressable style={styles.closeFaq} onPress={()=>setFaqVisible(false)}>
              <Text style={{color:"#fff", fontWeight:"bold"}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5fa" },
  gradientBg: { // Fake gradient sweep
    position: "absolute", width: "180%", height: 370, top: -90, left: "-40%",
    borderRadius: 120, backgroundColor: "#e3d1fa", transform:[{rotate: "-13deg"}],
    opacity: 0.37
  },
  card: {
    width: "92%",
    alignItems: "center",
    padding: 31,
    backgroundColor: "#fff",
    borderRadius: 32,
    elevation: 10,
    shadowColor: "#5c258d36",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 25,
    marginTop: 43
  },
  logoAbs: {
    position:"absolute", top: -34, left: "47%", zIndex: 3,
    borderRadius: 42, backgroundColor:"#fff", borderWidth:2, borderColor:"#efe4fb"
  },
  logo: {
    fontSize: 64,
    marginBottom: -10,
    marginTop: -25
  },
  title: { fontSize: 25, fontWeight: "700", color: "#5c258d", letterSpacing: 1, marginBottom: 12, marginTop: 7 },
  text: { fontSize: 16, textAlign: "center", color: "#424", marginVertical: 4 },
  hr: {
    borderBottomWidth: 1.5,
    borderColor: "#efe4fb",
    width: 120,
    marginTop: 17,
    marginBottom: 19
  },
  teamBlock: {width:'100%', marginBottom:13, marginTop: 2},
  teamHeader: {fontWeight:'bold', marginBottom:5, color:"#5c258d"},
  memberRow: {
    flexDirection:"row", alignItems:"center", gap:14, marginBottom:8, marginTop:4
  },
  avatar: {
    width:34, height:34, borderRadius:18, marginRight:0,
    alignItems:'center', justifyContent:'center', backgroundColor:'#eee', borderWidth:1, borderColor:"#efe4fb"
  },
  memName: {fontWeight:"bold",fontSize:15, letterSpacing:0.13},
  memRole: {color:"#9891be", fontSize:12, fontWeight:'600', marginTop:-2},
  faqBtn: {
    backgroundColor:"#fff", borderWidth:1, borderColor:"#6a33a5",
    borderRadius:18, paddingHorizontal:21, paddingVertical:7, flexDirection:"row",
    alignItems:'center', gap:8, marginTop:8, marginBottom:10
  },
  faqText: {color:"#6a33a5", fontWeight:"bold"},
  socialBlock: { width: "100%", alignItems: "center", marginBottom: 10 },
  connectTxt: { color: "#5c258d", fontWeight:"bold", marginBottom: 5, fontSize: 15 },
  socialRow: { flexDirection: "row", gap: 24, justifyContent: "center", marginBottom: 8 },
  socialIcon: { backgroundColor: "#fff", borderRadius:18 },
  linkBtn: {
    marginTop: 21,
    backgroundColor: "#5c258d",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 29,
    flexDirection: "row",
    alignItems: "center",
    gap: 13
  },
  linkBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 5 },
  madeWith: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 17,
    backgroundColor: "#f2eafd",
    paddingHorizontal: 13,
    paddingVertical: 7
  },
  modalBg:{
    flex:1, backgroundColor:'rgba(35,18,65,0.25)', justifyContent:'center', alignItems:'center'
  },
  modalCard:{
    width:"80%", backgroundColor:'#fff', borderRadius:21, padding:27, alignItems:'stretch', elevation:10
  },
  faqTitle:{color:"#5c258d", fontWeight:"bold", fontSize:18, marginBottom:13},
  faqQ:{color:"#473285", fontWeight:"bold", marginBottom:1, marginTop:11},
  faqA:{color:"#303045", marginLeft:3, marginBottom:2, fontSize:14},
  closeFaq:{
    marginTop:19, backgroundColor:"#6c5ce7", alignSelf:"center", borderRadius:12, paddingHorizontal:24, paddingVertical:8
  }
});
