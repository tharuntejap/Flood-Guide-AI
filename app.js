/**
 * ==========================================================================
 * FLOODGUARD AI — HYDRO-INFORMATICS CLIENT ENGINE
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- LOCAL FALLBACK SEARCH DATABASE ---
  const locationFallbackIndex = [
    { name: "Vijayawada", admin1: "Andhra Pradesh", country: "India", lat: 16.5186, lon: 80.6195 },
    { name: "Guntur", admin1: "Andhra Pradesh", country: "India", lat: 16.3067, lon: 80.4365 },
    { name: "Mangalagiri", admin1: "Andhra Pradesh", country: "India", lat: 16.4300, lon: 80.5500 },
    { name: "Tenali", admin1: "Andhra Pradesh", country: "India", lat: 16.2430, lon: 80.6400 },
    { name: "Amaravati", admin1: "Andhra Pradesh", country: "India", lat: 16.5730, lon: 80.3575 },
    { name: "Tadepalle", admin1: "Andhra Pradesh", country: "India", lat: 16.4800, lon: 80.6000 },
    { name: "Ibrahimpatnam", admin1: "Andhra Pradesh", country: "India", lat: 16.5880, lon: 80.5180 },
    { name: "Gannavaram", admin1: "Andhra Pradesh", country: "India", lat: 16.5400, lon: 80.8000 },
    { name: "Gudivada", admin1: "Andhra Pradesh", country: "India", lat: 16.4300, lon: 80.9900 },
    { name: "Machilipatnam", admin1: "Andhra Pradesh", country: "India", lat: 16.1800, lon: 81.1300 },
    { name: "Eluru", admin1: "Andhra Pradesh", country: "India", lat: 16.7100, lon: 81.1000 },
    { name: "Rajahmundry", admin1: "Andhra Pradesh", country: "India", lat: 17.0000, lon: 81.7800 },
    { name: "Visakhapatnam", admin1: "Andhra Pradesh", country: "India", lat: 17.6868, lon: 83.2185 },
    { name: "Hyderabad", admin1: "Telangana", country: "India", lat: 17.3850, lon: 78.4867 },
    { name: "Warangal", admin1: "Telangana", country: "India", lat: 17.9784, lon: 79.5941 },
    { name: "Mumbai", admin1: "Maharashtra", country: "India", lat: 19.0144, lon: 72.8428 },
    { name: "Chennai", admin1: "Tamil Nadu", country: "India", lat: 12.9791, lon: 80.2185 },
    { name: "Velachery", admin1: "Tamil Nadu", country: "India", lat: 12.9791, lon: 80.2185 },
    { name: "Bengaluru", admin1: "Karnataka", country: "India", lat: 12.9352, lon: 77.6772 },
    { name: "Kolkata", admin1: "West Bengal", country: "India", lat: 22.5833, lon: 88.3639 },
    { name: "Delhi", admin1: "Delhi", country: "India", lat: 28.6139, lon: 77.2090 }
  ];

  // --- MULTI-LANGUAGE TRANSLATION DICTIONARY (i18n) ---
  const i18nDict = {
    en: {
      locModalTitle: "📍 Turn On Device Location",
      locModalSub: "Enable location access so FloodGuard AI can analyze live flood conditions in your exact area.",
      locModalDefaultLabel: "Default Pre-Set Area:",
      locModalGpsNote: "Coordinates: 16.5186° N, 80.6195° E",
      locModalTurnOnBtn: "Turn On Location & Open Dashboard",
      locModalUseDefaultBtn: "Continue with Default Area (Vijayawada)",
      locModalOrSearch: "Or search a different city/village in English:",
      liveDataBadge: "LIVE TELEMETRY",
      brandSubtitle: "🌊 Early Warning Flood Alert & Safety Dashboard",
      alertsBtn: "Alerts",
      dangerAlertBtn: "Danger Alert",
      advisoryMsgDefault: "Checking live weather and ground level. No danger detected right now.",
      updatedLabel: "Updated:",
      tabDashboard: "Live City Dashboard",
      tabSimulator: "Rain & Drain Test Lab",
      tabReports: "Citizen Water Complaints",
      tabHotspots: "Danger Spots & Shelters",
      searchPlaceholder: "Search city, town, or village in English (e.g. Vijayawada, Guntur, Velachery)...",
      checkRiskBtn: "Check Risk",
      quickSelectLabel: "Quick Select:",
      kpiSelectedArea: "Selected Area",
      satelliteConnected: "Live Satellite Connected",
      kpiFloodScore: "Flood Danger Score",
      conditionLabel: "Condition:",
      predictionEngineFoot: "Real-time prediction using live rain & terrain",
      kpiLiveRain: "Live Rain (Past 1h)",
      next24hRain: "Next 24 Hours Expected:",
      kpiAltitude: "Ground Height (Altitude)",
      metersUnit: "meters high",
      landShape: "Land Shape:",
      lowGroundNote: "Low Ground (Water Collects)",
      highGroundNote: "High Ground (Safe Slope)",
      mapHeading: "Live City Flood Map",
      mapStyleTopo: "Topographic View",
      mapStyleStreet: "Street Map View",
      heatMapLayer: "Flood Heat Map",
      sheltersLayer: "Shelters",
      complaintsLayer: "Complaints",
      recenterBtn: "Reset View",
      legendSafe: "Low Risk (<30)",
      legendMedium: "Moderate (30-55)",
      legendWarning: "High Risk (55-75)",
      legendDanger: "Critical (>75)",
      graphHeading24h: "24-Hour Hourly Rain Forecast",
      btnGraph24h: "24h Rain",
      btnGraphWater: "Water Level",
      btnGraphPie: "Risk Factors Pie",
      btnGraphHistory: "7-Day Trend",
      pieHeading: "Estimated Risk Impact Share",
      pieDescription: "Decomposition of what factors are driving flood risks and potential damage in this specific area.",
      causesHeading: "Why is this area at risk? (Live Causes)",
      accuracyLabel: "Accuracy",
      causeRain: "Heavy Rain Stress",
      causeElevation: "Low Land Depth (Water flows in)",
      causeDrain: "Drain Pipe Blockage",
      causeSoil: "Soil Wetness (Cannot soak more)",
      whatToDoHeading: "What should you & the city do?",
      dispatchTruckBtn: "Send Drain Cleaning Truck to this Area",
      sheltersHeading: "Nearby Safe Shelters & Hospitals",
      simHeading: "Test What Happens If Heavy Rain Falls (Test Lab)",
      simLead: "Drag the sliders below to see what happens to this area during sudden cloudbursts, longer storms, or when garbage chokes the city drains.",
      simRainLabel: "Rain Speed & Amount",
      simDurLabel: "How Long Rain Falls (Hours)",
      simDrainLabel: "Garbage / Mud in Drain Pipes",
      simSoilLabel: "Ground Wetness",
      simRunBtn: "Calculate Flooding Chance",
      simResetBtn: "Reset to Normal",
      simBaseLabel: "Normal Risk",
      simStormLabel: "Risk During This Storm",
      simDeltaLabel: "Risk Increased By:",
      simActionTitle: "Action Required Right Now:",
      repFormHeading: "Report Flooding on Your Street",
      citizenHelpBadge: "Citizen Help",
      repLocLabel: "Street or Landmark Name",
      repLatLabel: "Latitude",
      repLonLabel: "Longitude",
      repTypeLabel: "Problem Type",
      repSeverityLabel: "How Deep is the Water?",
      repDescLabel: "More Details",
      repSubmitBtn: "Submit Problem to Emergency Team",
      repStreamHeading: "Reports Submitted by Citizens",
      clearAllBtn: "Clear All",
      hotspotsHeading: "High-Risk City Areas List",
      officialListBadge: "Official Priority List",
      hotspotsLead: "These areas in the city are historically known to flood first whenever heavy downpours happen.",
      thArea: "Area Name",
      thCity: "City / State",
      thHeight: "Ground Height",
      thPaved: "Paved Road %",
      thReason: "Main Reason for Flooding",
      thDanger: "Danger Level",
      thAction: "Municipal Action",
      liveSystemLabel: "Live System:"
    },

    te: {
      locModalTitle: "📍 పరికరం లొకేషన్‌ను ఆన్ చేయండి",
      locModalSub: "మీ ప్రాంతంలో లైవ్ వరద పరిస్థితులను విశ్లేషించడానికి లొకేషన్ యాక్సెస్‌ను అనుమతించండి.",
      locModalDefaultLabel: "డిఫాల్ట్ ముందస్తు ప్రాంతం:",
      locModalGpsNote: "కోఆర్డినేట్స్: 16.5186° N, 80.6195° E",
      locModalTurnOnBtn: "లొకేషన్ ఆన్ చేసి డాష్‌బోర్డ్‌లోకి వెళ్లండి",
      locModalUseDefaultBtn: "డిఫాల్ట్ ప్రాంతంతో కొనసాగండి (Vijayawada)",
      locModalOrSearch: "లేదా వేరొక నగరం/గ్రామాన్ని ఇంగ్లీషులో వెతకండి:",
      liveDataBadge: "లైవ్ టెలిమెట్రీ",
      brandSubtitle: "🌊 ముందస్తు వరద హెచ్చరిక & ప్రజా రక్షణ వేదిక",
      alertsBtn: "హెచ్చరికలు",
      dangerAlertBtn: "ప్రమాద హెచ్చరిక",
      advisoryMsgDefault: "వర్షపాతం మరియు భూమి ఎత్తును పరిశీలిస్తున్నాము. ప్రస్తుతం ప్రమాదం లేదు.",
      updatedLabel: "నవీకరించబడింది:",
      tabDashboard: "లైవ్ డాష్‌బోర్డ్",
      tabSimulator: "వర్షం & డ్రైనేజీ పరీక్ష ల్యాబ్",
      tabReports: "ప్రజల వరద ఫిర్యాదులు",
      tabHotspots: "ముంపు ప్రాంతాలు & ఆశ్రయాలు",
      searchPlaceholder: "Search city, town, or village in English...",
      checkRiskBtn: "రిస్క్ చూడండి",
      quickSelectLabel: "త్వరిత ఎంపిక:",
      kpiSelectedArea: "ఎంచుకున్న ప్రాంతం",
      satelliteConnected: "ఉపగ్రహ సమాచారం కనెక్ట్ చేయబడింది",
      kpiFloodScore: "వరద ప్రమాద స్కోరు",
      conditionLabel: "పరిస్థితి:",
      predictionEngineFoot: "లైవ్ వర్షం మరియు భూమి ఎత్తుతో అంచనా",
      kpiLiveRain: "గడచిన గంట వర్షం",
      next24hRain: "రాబోయే 24 గంటల అంచనా:",
      kpiAltitude: "భూమి ఎత్తు (సముద్ర మట్టం నుండి)",
      metersUnit: "మీటర్ల ఎత్తు",
      landShape: "భూమి ఆకారం:",
      lowGroundNote: "పల్లపు ప్రాంతం (నీరు నిల్వ ఉండే అవకాశం)",
      highGroundNote: "ఎత్తైన ప్రాంతం (సురక్షితం)",
      mapHeading: "లైవ్ సిటీ వరద మ్యాప్",
      mapStyleTopo: "ఎత్తు పల్లాల మ్యాప్",
      mapStyleStreet: "సాధారణ వీధి మ్యాప్",
      heatMapLayer: "వరద హీట్ మ్యాప్",
      sheltersLayer: "పునరావాస కేంద్రాలు",
      complaintsLayer: "ప్రజా ఫిర్యాదులు",
      recenterBtn: "మ్యాప్ రీసెట్",
      legendSafe: "తక్కువ రిస్క్ (<30)",
      legendMedium: "మధ్యస్థం (30-55)",
      legendWarning: "ఎక్కువ రిస్క్ (55-75)",
      legendDanger: "తీవ్ర ప్రమాదం (>75)",
      graphHeading24h: "24 గంటల వర్షపాత అంచనా",
      btnGraph24h: "24గం వర్షం",
      btnGraphWater: "నీటి మట్టం",
      btnGraphPie: "రిస్క్ కారకాల పై చార్ట్",
      btnGraphHistory: "7 రోజుల ట్రెండ్",
      pieHeading: "ప్రమాద కారకాల శాతం",
      pieDescription: "ఈ ప్రాంతంలో వరద రావడానికి ప్రధాన కారణాల విభజన.",
      causesHeading: "ఈ ప్రాంతంలో ప్రమాదానికి కారణాలు",
      accuracyLabel: "ఖచ్చితత్వం",
      causeRain: "భారీ వర్షపాతం ప్రభావం",
      causeElevation: "పల్లపు ప్రాంతం (నీరు చేరే లోయ)",
      causeDrain: "కాలువల పూడిక / అడ్డంకులు",
      causeSoil: "మట్టిలో నీటి నిల్వ శాతం",
      whatToDoHeading: "ప్రభుత్వం & ప్రజలు చేయాల్సిన పనులు",
      dispatchTruckBtn: "కాలువ క్లీనింగ్ వాహనాన్ని పంపండి",
      sheltersHeading: "సమీప పునరావాస కేంద్రాలు & ఆసుపత్రులు",
      simHeading: "భారీ వర్షం పడితే ఏమవుతుందో పరీక్షించండి",
      simLead: "తీవ్రమైన తుఫానులు లేదా కాలువలు పూడిపోయినప్పుడు వరద ఎలా మారుతుందో చూడటానికి స్లైడర్‌లను జరపండి.",
      simRainLabel: "వర్షం వేగం & పరిమాణం",
      simDurLabel: "ఎంత సమయం పడుతుంది (గంటలు)",
      simDrainLabel: "కాలువల్లో చెత్త / పూడిక శాతం",
      simSoilLabel: "నేలలో నీటి శాతం",
      simRunBtn: "వరద అవకాశాన్ని లెక్కించండి",
      simResetBtn: "రీసెట్ చేయండి",
      simBaseLabel: "సాధారణ పరిస్థితి",
      simStormLabel: "తుఫాను సమయ రిస్క్",
      simDeltaLabel: "రిస్క్ పెరిగిన మొత్తం:",
      simActionTitle: "తక్షణ చర్యలు:",
      repFormHeading: "మీ వీధిలో వరద సమస్యను నమోదు చేయండి",
      citizenHelpBadge: "ప్రజా సహాయం",
      repLocLabel: "వీధి లేదా ప్రాంతం పేరు",
      repLatLabel: "అక్షాంశం (Latitude)",
      repLonLabel: "రేఖాంశం (Longitude)",
      repTypeLabel: "సమస్య రకం",
      repSeverityLabel: "నీరు ఎంత లోతుగా ఉంది?",
      repDescLabel: "మరిన్ని వివరాలు",
      repSubmitBtn: "అధికారులకు ఫిర్యాదు పంపండి",
      repStreamHeading: "ప్రజలు పంపిన తాజా ఫిర్యాదులు",
      clearAllBtn: "అన్నీ తొలగించు",
      hotspotsHeading: "ఎక్కువగా మునిగిపోయే ప్రాంతాల జాబితా",
      officialListBadge: "అధికారిక జాబితా",
      hotspotsLead: "భారీ వర్షాలు పడినప్పుడు నగరంలో మొదటగా ముంపునకు గురయ్యే ప్రాంతాలు.",
      thArea: "ప్రాంతం పేరు",
      thCity: "నగరం / రాష్ట్రం",
      thHeight: "భూమి ఎత్తు",
      thPaved: "కాంక్రీట్ రోడ్ల %",
      thReason: "వరదకు ముఖ్య కారణం",
      thDanger: "ప్రమాద తీవ్రత",
      thAction: "మున్సిపల్ చర్య",
      liveSystemLabel: "లైవ్ వ్యవస్థ:"
    },

    hi: {
      locModalTitle: "📍 डिवाइस का स्थान (Location) चालू करें",
      locModalSub: "स्थान एक्सेस की अनुमति दें ताकि FloodGuard AI आपके क्षेत्र में लाइव बाढ़ जोखिम की जांच कर सके।",
      locModalDefaultLabel: "डिफ़ॉल्ट पूर्व-निर्धारित क्षेत्र:",
      locModalGpsNote: "निर्देशांक: 16.5186° N, 80.6195° E",
      locModalTurnOnBtn: "स्थान चालू करें और डैशबोर्ड खोलें",
      locModalUseDefaultBtn: "डिफ़ॉल्ट क्षेत्र के साथ आगे बढ़ें (Vijayawada)",
      locModalOrSearch: "या किसी अन्य शहर/गाँव को अंग्रेजी में खोजें:",
      liveDataBadge: "लाइव टेलीमेट्री",
      brandSubtitle: "🌊 शहरी बाढ़ चेतावनी एवं आपदा प्रबंधन प्रणाली",
      alertsBtn: "सूचनाएं",
      dangerAlertBtn: "खतरे की चेतावनी",
      advisoryMsgDefault: "मौसम एवं जलभराव की स्थिति सामान्य है। कोई खतरा नहीं है।",
      updatedLabel: "अपडेट हुआ:",
      tabDashboard: "लाइव डैशबोर्ड",
      tabSimulator: "वर्षा सिमुलेटर टेस्ट",
      tabReports: "नागरिक बाढ़ रिपोर्ट",
      tabHotspots: "संवेदनशील क्षेत्र एवं राहत केंद्र",
      searchPlaceholder: "Search city, town, or village in English...",
      checkRiskBtn: "जोखिम देखें",
      quickSelectLabel: "त्वरित चयन:",
      kpiSelectedArea: "चयनित क्षेत्र",
      satelliteConnected: "सैटेलाइट लिंक सक्रिय",
      kpiFloodScore: "बाढ़ जोखिम स्कोर",
      conditionLabel: "स्थिति:",
      predictionEngineFoot: "वास्तविक समय वर्षा एवं भू-स्तर विश्लेषण",
      kpiLiveRain: "पिछले 1 घंटे की बारिश",
      next24hRain: "अगले 24 घंटे की संभावित बारिश:",
      kpiAltitude: "जमीनी ऊंचाई (समुद्र तल से)",
      metersUnit: "मीटर",
      landShape: "भू-भाग संरचना:",
      lowGroundNote: "निचला इलाका (पानी भरने की संभावना)",
      highGroundNote: "ऊंचा इलाका (सुरक्षित)",
      mapHeading: "लाइव जलभराव मानचित्र",
      mapStyleTopo: "टोपोग्राफिक मानचित्र",
      mapStyleStreet: "सामान्य सड़क मानचित्र",
      heatMapLayer: "बाढ़ हीट मैप",
      sheltersLayer: "राहत केंद्र",
      complaintsLayer: "नागरिक रिपोर्ट",
      recenterBtn: "मैप रीसेट",
      legendSafe: "कम जोखिम (<30)",
      legendMedium: "मध्यम (30-55)",
      legendWarning: "उच्च जोखिम (55-75)",
      legendDanger: "गंभीर खतरा (>75)",
      graphHeading24h: "24 घंटे का वर्षा पूर्वानुमान",
      btnGraph24h: "24घं बारिश",
      btnGraphWater: "जल स्तर",
      btnGraphPie: "जोखिम कारक पाई चार्ट",
      btnGraphHistory: "7-दिवसीय रुझान",
      pieHeading: "बाढ़ जोखिम का प्रतिशत विश्लेषण",
      pieDescription: "क्षेत्र में बाढ़ और नुकसान की संभावना बढ़ाने वाले मुख्य कारकों का विवरण।",
      causesHeading: "जोखिम के मुख्य कारण (लाइव)",
      accuracyLabel: "सटीकता",
      causeRain: "भारी बारिश का दबाव",
      causeElevation: "निचला इलाका (ढलान जल प्रवाह)",
      causeDrain: "नालों में कचरा एवं अवरोध",
      causeSoil: "मिट्टी में नमी की संतृप्ति",
      whatToDoHeading: "नागरिकों एवं प्रशासन के लिए निर्देश",
      dispatchTruckBtn: "नाली सफाई वाहन भेजें",
      sheltersHeading: "निकटतम सुरक्षित राहत शिविर एवं अस्पताल",
      simHeading: "सिमुलेटर: भारी बारिश का परीक्षण करें",
      simLead: "अत्यधिक बारिश या नाले जाम होने की स्थिति का प्रभाव देखने के लिए स्लाइडर को बदलें।",
      simRainLabel: "वर्षा की तीव्रता एवं मात्रा",
      simDurLabel: "बारिश की अवधि (घंटे)",
      simDrainLabel: "नालों में अवरोध प्रतिशत",
      simSoilLabel: "जमीन में नमी",
      simRunBtn: "बाढ़ संभावना की गणना करें",
      simResetBtn: "सामान्य करें",
      simBaseLabel: "सामान्य जोखिम",
      simStormLabel: "तूफान के दौरान जोखिम",
      simDeltaLabel: "जोखिम में वृद्धि:",
      simActionTitle: "आवश्यक त्वरित कदम:",
      repFormHeading: "अपने क्षेत्र में जलभराव की शिकायत दर्ज करें",
      citizenHelpBadge: "नागरिक सहायता",
      repLocLabel: "सड़क या लैंडमार्क का नाम",
      repLatLabel: "अक्षांश (Latitude)",
      repLonLabel: "देशांतर (Longitude)",
      repTypeLabel: "समस्या का प्रकार",
      repSeverityLabel: "पानी की गहराई कितनी है?",
      repDescLabel: "अन्य विवरण",
      repSubmitBtn: "आपदा प्रबंधन दल को भेजें",
      repStreamHeading: "नागरिकों द्वारा दर्ज की गई रिपोर्ट",
      clearAllBtn: "सभी हटाएं",
      hotspotsHeading: "संभावित बाढ़ प्रभावित क्षेत्रों की सूची",
      officialListBadge: "आधिकारिक सूची",
      hotspotsLead: "ये वे क्षेत्र हैं जहां अत्यधिक वर्षा होने पर सबसे पहले पानी भरता है।",
      thArea: "क्षेत्र का नाम",
      thCity: "शहर / राज्य",
      thHeight: "जमीनी ऊंचाई",
      thPaved: "कंक्रीट रोड %",
      thReason: "बाढ़ का मुख्य कारण",
      thDanger: "खतरे का स्तर",
      thAction: "प्रशासनिक कार्रवाई",
      liveSystemLabel: "लाइव सिस्टम:"
    },

    ta: {
      locModalTitle: "📍 இருப்பிடத்தை (Location) இயக்கவும்",
      locModalSub: "உங்கள் பகுதியில் நேரலை வெள்ள அபாயத்தை ஆய்வு செய்ய அனுமதி வழங்கவும்.",
      locModalDefaultLabel: "இயல்புநிலை பகுதி:",
      locModalGpsNote: "ஆயத்தொலைவுகள்: 16.5186° N, 80.6195° E",
      locModalTurnOnBtn: "இருப்பிடத்தை இயக்கி டாஷ்போர்டிற்குச் செல்லவும்",
      locModalUseDefaultBtn: "இயல்புநிலை பகுதியுடன் தொடரவும் (Vijayawada)",
      locModalOrSearch: "அல்லது வேறொரு நகரத்தை ஆங்கிலத்தில் தேடுங்கள்:",
      liveDataBadge: "நேரலை டெலிமெட்ரி",
      brandSubtitle: "🌊 நகர்ப்புற வெள்ள அபாய எச்சரிக்கை தளம்",
      alertsBtn: "எச்சரிக்கைகள்",
      dangerAlertBtn: "ஆபத்து எச்சரிக்கை",
      advisoryMsgDefault: "வானிலை மற்றும் நில அளவை கண்காணிக்கப்படுகிறது. தற்போது ஆபத்து இல்லை.",
      updatedLabel: "புதுப்பிக்கப்பட்டது:",
      tabDashboard: "நேரலை டாஷ்போர்டு",
      tabSimulator: "மழை சோதனை கூடம்",
      tabReports: "மக்கள் வெள்ள புகார்கள்",
      tabHotspots: "ஆபத்தான பகுதிகள் & புகலிடங்கள்",
      searchPlaceholder: "Search city, town, or village in English...",
      checkRiskBtn: "ஆபத்தை சரிபார்க்கவும்",
      quickSelectLabel: "விரைவு தேர்வு:",
      kpiSelectedArea: "தேர்ந்தெடுக்கப்பட்ட பகுதி",
      satelliteConnected: "செயற்கைக்கோள் இணைப்பு செயலில் உள்ளது",
      kpiFloodScore: "வெள்ள அபாய மதிப்பீடு",
      conditionLabel: "நிலைமை:",
      predictionEngineFoot: "நேரலை மழை மற்றும் நில அமைப்பின் மதிப்பீடு",
      kpiLiveRain: "கடந்த 1 மணி நேர மழை",
      next24hRain: "அடுத்த 24 மணி நேர மழை அளவு:",
      kpiAltitude: "நில உயரம் (கடல் மட்டத்திலிருந்து)",
      metersUnit: "மீட்டர்",
      landShape: "நில அமைப்பு:",
      lowGroundNote: "பள்ளமான பகுதி (தண்ணீர் தேங்கும் அபாயம்)",
      highGroundNote: "மேட்டு நிலம் (பாதுகாப்பானது)",
      mapHeading: "நகர வெள்ள நேரலை வரைபடம்",
      mapStyleTopo: "நிலப்பரப்பு வரைபடம்",
      mapStyleStreet: "தெரு வரைபடம்",
      heatMapLayer: "வெள்ள வெப்ப வரைபடம்",
      sheltersLayer: "பாதுகாப்பு முகாம்கள்",
      complaintsLayer: "மக்கள் புகார்கள்",
      recenterBtn: "மறுசீரமைக்கவும்",
      legendSafe: "குறைந்த ஆபத்து (<30)",
      legendMedium: "மிதமான ஆபத்து (30-55)",
      legendWarning: "அதிக ஆபத்து (55-75)",
      legendDanger: "ஆபத்தானது (>75)",
      graphHeading24h: "24 மணி நேர மழை கணிப்பு",
      btnGraph24h: "24ம மழை",
      btnGraphWater: "நீர் மட்டம்",
      btnGraphPie: "அபாய காரணிகள் பை-சார்ட்",
      btnGraphHistory: "7 நாள் போக்கு",
      pieHeading: "அபாய காரணிகள் பகிர்வு",
      pieDescription: "இந்த பகுதியில் வெள்ள அபாயத்தை ஏற்படுத்தும் முதன்மை காரணிகளின் விவரம்.",
      causesHeading: "இந்த பகுதியில் ஆபத்து ஏற்படுவதற்கான காரணங்கள்",
      accuracyLabel: "துல்லியம்",
      causeRain: "கனமழை தாக்கம்",
      causeElevation: "பள்ளமான பகுதி",
      causeDrain: "வடிகால் அடைப்பு",
      causeSoil: "மண்ணின் ஈரப்பதம்",
      whatToDoHeading: "பொதுமக்கள் மற்றும் மாநகராட்சி செய்ய வேண்டியவை",
      dispatchTruckBtn: "வடிகால் தூய்மை வாகனத்தை அனுப்பவும்",
      sheltersHeading: "அருகிலுள்ள பாதுகாப்பு முகாம்கள் மற்றும் மருத்துவமனைகள்",
      simHeading: "கனமழை பெய்தால் என்ன நடக்கும் என்பதை சோதிக்கவும்",
      simLead: "கனமழை அல்லது வடிகால் அடைப்பு ஏற்படும்போது வெள்ள அபாயத்தை கணிக்கவும்.",
      simRainLabel: "மழையின் வேகம் மற்றும் அளவு",
      simDurLabel: "மழை பெய்யும் நேரம் (மணி)",
      simDrainLabel: "வடிகால் அடைப்பு சதவிகிதம்",
      simSoilLabel: "மண்ணின் ஈரப்பதம்",
      simRunBtn: "வெள்ள அபாயத்தை கணக்கிடுங்கள்",
      simResetBtn: "மீட்டமைக்கவும்",
      simBaseLabel: "இயல்பு நிலை",
      simStormLabel: "புயலின் போது ஆபத்து",
      simDeltaLabel: "ஆபத்து அதிகரிப்பு:",
      simActionTitle: "உடனடி நடவடிக்கை:",
      repFormHeading: "உங்கள் பகுதியில் வெள்ளப் பிரச்சினையைப் புகாரளிக்கவும்",
      citizenHelpBadge: "மக்கள் உதவி",
      repLocLabel: "தெரு அல்லது பகுதியின் பெயர்",
      repLatLabel: "அட்சரேகை (Latitude)",
      repLonLabel: "தீர்க்கரேகை (Longitude)",
      repTypeLabel: "பிரச்சினை வகை",
      repSeverityLabel: "தண்ணீரின் ஆழம் எவ்வளவு?",
      repDescLabel: "கூடுதல் விவரங்கள்",
      repSubmitBtn: "அதிகாரிகளுக்கு அனுப்பவும்",
      repStreamHeading: "மக்கள் பதிவு செய்த புகார்கள்",
      clearAllBtn: "அனைத்தையும் நீக்கு",
      hotspotsHeading: "அதிக ஆபத்துள்ள நகரப் பகுதிகள்",
      officialListBadge: "அதிகாரப்பூர்வ பட்டியல்",
      hotspotsLead: "கனமழை பெய்யும் போது முதலில் வெள்ளத்தில் மூழ்கும் இடங்கள்.",
      thArea: "பகுதியின் பெயர்",
      thCity: "நகரம் / மாநிலம்",
      thHeight: "நில உயரம்",
      thPaved: "தார்/கான்கிரீட் சாலை %",
      thReason: "வெள்ளத்திற்கு முதன்மை காரணம்",
      thDanger: "ஆபத்தின் அளவு",
      thAction: "மாநகராட்சி நடவடிக்கை",
      liveSystemLabel: "நேரலை அமைப்பு:"
    }
  };

  // --- APPLICATION STATE ---
  const state = {
    currentLang: "en",
    activeLocation: {
      name: "Vijayawada (Krishna River)",
      lat: 16.5186,
      lon: 80.6195,
      elevation: 18.0
    },
    weather: null,
    risk: null,
    activeGraphType: "24h",
    isTopoLayerActive: false,
    shelters: [
      { name: "Government General Hospital (GGH)", type: "Hospital", lat: 16.5111, lon: 80.6322, cap: 800, phone: "+91-866-2574444" },
      { name: "Municipal Ward 4 Relief Shelter", type: "Safe Shelter", lat: 16.5210, lon: 80.6120, cap: 450, phone: "+91-866-2422222" },
      { name: "One Town Community Hall Center", type: "Safe Shelter", lat: 16.5160, lon: 80.6150, cap: 250, phone: "+91-866-2423333" }
    ],
    reports: []
  };

  // Map & Chart Instances
  let mapInstance = null;
  let baseTileLayer = null;
  let topoTileLayer = null;
  let heatMapLayerGroup = null;
  let sheltersGroup = null;
  let reportsGroup = null;
  let primaryChart = null;

  // --- 3D TILT HOVER ENGINE FOR KPI CARDS ---
  function init3DTiltEffects() {
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // --- LANGUAGE SWITCHER HELPER ---
  function applyLanguage(lang) {
    state.currentLang = lang;
    const dict = i18nDict[lang] || i18nDict.en;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const key = el.getAttribute("data-i18n-ph");
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });

    updateGraphHeading();
    if (state.activeGraphType === "damagepie") {
      renderPieInfoBox();
    }
  }

  function updateGraphHeading() {
    const dict = i18nDict[state.currentLang] || i18nDict.en;
    const headingEl = document.getElementById("current-graph-heading");
    if (!headingEl) return;

    if (state.activeGraphType === "24h") {
      headingEl.innerHTML = `📊 ${dict.graphHeading24h}`;
    } else if (state.activeGraphType === "waterlevel") {
      headingEl.innerHTML = `🌊 ${dict.btnGraphWater} (${dict.metersUnit})`;
    } else if (state.activeGraphType === "damagepie") {
      headingEl.innerHTML = `🥧 ${dict.btnGraphPie}`;
    } else if (state.activeGraphType === "history") {
      headingEl.innerHTML = `📈 ${dict.btnGraphHistory}`;
    }
  }

  // --- AUDIO ALERT BEEPER ---
  function playAlertBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.warn("Audio Context unavailable.");
    }
  }

  // --- TOAST ALERTS & BROWSER NOTIFICATIONS ---
  function triggerEmergencyAlert(title, message, severity = "danger") {
    playAlertBeep();

    const container = document.getElementById("toast-container");
    if (container) {
      const toast = document.createElement("div");
      toast.className = `toast ${severity}`;
      toast.innerHTML = `
        <div class="toast-icon">
          <i class="fa-solid ${severity === 'danger' ? 'fa-triangle-exclamation' : 'fa-bell'}"></i>
        </div>
        <div class="toast-content">
          <h4>${title}</h4>
          <p>${message}</p>
        </div>
      `;
      container.prepend(toast);

      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        setTimeout(() => toast.remove(), 300);
      }, 6000);
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`FloodGuard Alert: ${title}`, {
        body: message,
        icon: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
      });
    }

    logAudit(`ACTION DISPATCHED: ${title} - ${message}`);
  }

  function initClock() {
    const clockEl = document.getElementById("system-clock");
    const update = () => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString() + " Live";
    };
    update();
    setInterval(update, 1000);
  }

  function logAudit(message) {
    const stream = document.getElementById("footer-audit-stream");
    if (stream) {
      const timeStr = new Date().toLocaleTimeString();
      stream.textContent = `[${timeStr}] ${message}`;
    }
  }

  function initTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const panes = document.querySelectorAll(".tab-pane");

    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        panes.forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const target = document.getElementById(btn.dataset.tab);
        if (target) {
          target.classList.add("active");
          if (btn.dataset.tab === "tab-dashboard" && mapInstance) {
            setTimeout(() => {
              mapInstance.invalidateSize();
            }, 250);
          }
        }
      });
    });
  }

  window.addEventListener('resize', () => {
    if (mapInstance) mapInstance.invalidateSize();
  });

  // --- OPEN-METEO GEOLOCATION SERVICES ---
  const OpenMeteoService = {
    async searchPlaces(query, count = 6) {
      const q = query.trim().toLowerCase();
      if (!q) return [];

      let onlineResults = [];

      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${count}&language=en&format=json`;
        const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
        if (res.ok) {
          const data = await res.json();
          if (data && data.results && data.results.length > 0) {
            onlineResults = data.results.map(item => ({
              name: item.name,
              admin1: item.admin1 || item.admin2 || "",
              country: item.country || "",
              latitude: item.latitude,
              longitude: item.longitude
            }));
          }
        }
      } catch (e) {
        console.warn("Live geocode slow, using local index.");
      }

      const localMatches = locationFallbackIndex
        .filter(item => item.name.toLowerCase().includes(q) || item.admin1.toLowerCase().includes(q))
        .map(item => ({
          name: item.name,
          admin1: item.admin1,
          country: item.country,
          latitude: item.lat,
          longitude: item.lon
        }));

      const combined = [...onlineResults, ...localMatches];
      const unique = [];
      const seen = new Set();

      for (const place of combined) {
        const key = `${place.name.toLowerCase()}-${place.latitude.toFixed(2)}-${place.longitude.toFixed(2)}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(place);
        }
      }

      return unique.slice(0, count);
    },

    async fetchForecast(lat, lon) {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=precipitation,rain,temperature_2m,relative_humidity_2m&hourly=precipitation&forecast_days=2&timezone=auto`;
        const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
        if (!res.ok) throw new Error("Forecast failed");
        return await res.json();
      } catch (e) {
        return {
          current: { precipitation: 14.2, temperature_2m: 29.1, relative_humidity_2m: 88 },
          hourly: {
            time: Array.from({length: 24}, (_, i) => `+${i}h`),
            precipitation: [3.5, 8.0, 14.5, 22.0, 18.0, 12.5, 6.0, 3.5, 1.5, 0.5, 0.0, 0.0, 1.2, 3.0, 7.5, 15.0, 20.0, 12.0, 5.0, 2.0, 0.5, 0.0, 0.0, 0.0]
          }
        };
      }
    },

    async fetchElevation(lat, lon) {
      try {
        const url = `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
        if (!res.ok) throw new Error("Elevation failed");
        const data = await res.json();
        return (data.elevation && data.elevation[0] !== undefined) ? data.elevation[0] : 18.0;
      } catch (e) {
        return 18.0;
      }
    }
  };

  // --- FLOOD RISK HEAT MAP LAYER BUILDER ---
  function buildFloodHeatMap(centerLat, centerLon, currentRisk) {
    if (!heatMapLayerGroup) return;
    heatMapLayerGroup.clearLayers();

    const colorRules = {
      low: "#22c55e",       // Low: Green
      moderate: "#d97706",  // Moderate: Yellow/Amber
      high: "#f97316",      // High: Orange
      critical: "#ef4444"   // Critical: Red
    };

    let centerColor = colorRules.low;
    if (currentRisk.score >= 75) centerColor = colorRules.critical;
    else if (currentRisk.score >= 55) centerColor = colorRules.high;
    else if (currentRisk.score >= 30) centerColor = colorRules.moderate;

    const centerZone = L.circle([centerLat, centerLon], {
      color: centerColor,
      fillColor: centerColor,
      fillOpacity: 0.38,
      weight: 2,
      radius: 1400
    });
    centerZone.bindPopup(`<strong>${state.activeLocation.name}</strong><br>Calculated Risk: ${currentRisk.score} (${currentRisk.category})`);
    heatMapLayerGroup.addLayer(centerZone);

    const contours = [
      { dLat: 0.012, dLon: 0.015, color: colorRules.critical, label: "Critical Lowland Basin" },
      { dLat: -0.015, dLon: 0.012, color: colorRules.high, label: "High Risk Sump" },
      { dLat: 0.014, dLon: -0.014, color: colorRules.moderate, label: "Moderate Inundation Plain" },
      { dLat: -0.012, dLon: -0.018, color: colorRules.low, label: "Low Risk Ridge" }
    ];

    contours.forEach(pt => {
      const circle = L.circle([centerLat + pt.dLat, centerLon + pt.dLon], {
        color: pt.color,
        fillColor: pt.color,
        fillOpacity: 0.32,
        weight: 1.5,
        radius: 1100
      });
      circle.bindPopup(`<strong>${pt.label}</strong><br>Spatial Heat Contour`);
      heatMapLayerGroup.addLayer(circle);
    });
  }

  // --- GIS LEAFLET MAP CONTROLLER ---
  function initMap() {
    const mapContainer = document.getElementById('gis-map');
    if (!mapContainer || typeof L === 'undefined') return;

    mapInstance = L.map('gis-map', {
      zoomControl: true,
      preferCanvas: true
    }).setView([state.activeLocation.lat, state.activeLocation.lon], 13);

    baseTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstance);

    topoTileLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: 'Map data: &copy; OpenStreetMap, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
    });

    heatMapLayerGroup = L.layerGroup().addTo(mapInstance);
    sheltersGroup = L.layerGroup().addTo(mapInstance);
    reportsGroup = L.layerGroup().addTo(mapInstance);

    renderShelters();

    const mapStyleBtn = document.getElementById("btn-toggle-map-style");
    if (mapStyleBtn) {
      mapStyleBtn.addEventListener("click", () => {
        state.isTopoLayerActive = !state.isTopoLayerActive;
        const dict = i18nDict[state.currentLang] || i18nDict.en;

        if (state.isTopoLayerActive) {
          mapInstance.removeLayer(baseTileLayer);
          mapInstance.addLayer(topoTileLayer);
          mapStyleBtn.innerHTML = `🗺️ ${dict.mapStyleStreet}`;
        } else {
          mapInstance.removeLayer(topoTileLayer);
          mapInstance.addLayer(baseTileLayer);
          mapStyleBtn.innerHTML = `🛰️ ${dict.mapStyleTopo}`;
        }
      });
    }

    document.getElementById("layer-heatmap").addEventListener("change", (e) => {
      if (e.target.checked) mapInstance.addLayer(heatMapLayerGroup);
      else mapInstance.removeLayer(heatMapLayerGroup);
    });

    document.getElementById("layer-shelters").addEventListener("change", (e) => {
      if (e.target.checked) mapInstance.addLayer(sheltersGroup);
      else mapInstance.removeLayer(sheltersGroup);
    });

    document.getElementById("layer-reports").addEventListener("change", (e) => {
      if (e.target.checked) mapInstance.addLayer(reportsGroup);
      else mapInstance.removeLayer(reportsGroup);
    });

    document.getElementById("btn-recenter-map").addEventListener("click", () => {
      mapInstance.setView([state.activeLocation.lat, state.activeLocation.lon], 13);
    });

    setTimeout(() => mapInstance.invalidateSize(), 300);
  }

  function renderShelters() {
    if (!sheltersGroup) return;
    sheltersGroup.clearLayers();
    const container = document.getElementById("shelters-container");
    container.innerHTML = "";

    state.shelters.forEach(s => {
      const marker = L.circleMarker([s.lat, s.lon], {
        radius: 8,
        color: "#ffffff",
        fillColor: "#0284c7",
        fillOpacity: 0.9,
        weight: 2
      });
      marker.bindPopup(`<strong class="place-name-en">${s.name}</strong><br>${s.type}<br>Capacity: ${s.cap} beds<br>Hotline: ${s.phone}`);
      sheltersGroup.addLayer(marker);

      const entry = document.createElement("div");
      entry.className = "shelter-entry";
      entry.innerHTML = `
        <div class="shelter-text">
          <strong class="place-name-en">${s.name}</strong>
          <small>${s.type} &bull; Phone: ${s.phone}</small>
        </div>
        <div class="shelter-pill">${s.cap} beds</div>
      `;
      container.appendChild(entry);
    });

    document.getElementById("shelter-count").textContent = `${state.shelters.length} Open`;
  }

  function renderReports() {
    if (!reportsGroup) return;
    reportsGroup.clearLayers();
    const stream = document.getElementById("reports-feed-container");
    stream.innerHTML = "";

    state.reports.forEach(r => {
      const isCritical = r.severity === "CRITICAL";
      const marker = L.circleMarker([r.latitude || r.lat, r.longitude || r.lon], {
        radius: isCritical ? 9 : 7,
        color: "#ffffff",
        fillColor: isCritical ? "#ef4444" : "#d97706",
        fillOpacity: 0.9,
        weight: 1.5
      });
      marker.bindPopup(`<strong class="place-name-en">${r.location}</strong><br>${r.problem_type || r.type} (${r.severity})<br>${r.description || r.desc}`);
      reportsGroup.addLayer(marker);

      const item = document.createElement("div");
      item.className = "stream-card";
      item.innerHTML = `
        <div class="stream-card-head">
          <strong class="place-name-en">${r.location}</strong>
          <span class="risk-pill risk-${r.severity}">${r.severity}</span>
        </div>
        <p>${r.description || r.desc}</p>
        <small>${r.problem_type || r.type} &bull; ${r.created_at || "Recent"}</small>
      `;
      stream.appendChild(item);
    });

    document.getElementById("reports-counter").textContent = state.reports.length;
  }

  // --- MULTI-GRAPH RENDERER ---
  function renderActiveGraph() {
    const canvas = document.getElementById("chart-primary");
    const pieInfoBox = document.getElementById("pie-info-box");
    if (!canvas || typeof Chart === 'undefined') return;

    if (primaryChart) primaryChart.destroy();
    updateGraphHeading();

    if (state.activeGraphType === "24h") {
      pieInfoBox.style.display = "none";
      const hours = Array.from({length: 24}, (_, i) => `+${i}h`);
      let rainData = Array(24).fill(0);

      if (state.weather && state.weather.hourly && state.weather.hourly.precipitation) {
        rainData = state.weather.hourly.precipitation.slice(0, 24);
      }

      primaryChart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: hours,
          datasets: [{
            label: "Expected Rain (mm/hr)",
            data: rainData,
            backgroundColor: "#38bdf8",
            borderColor: "#0284c7",
            borderWidth: 1.5,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, grid: { color: "#2d4263" }, ticks: { color: "#cbd5e1" } },
            x: { grid: { display: false }, ticks: { color: "#cbd5e1" } }
          },
          plugins: { legend: { display: false } }
        }
      });

    } else if (state.activeGraphType === "waterlevel") {
      pieInfoBox.style.display = "none";
      const hours = Array.from({length: 24}, (_, i) => `+${i}h`);
      
      const baseLevel = (state.activeLocation.elevation <= 12) ? 2.4 : 1.1;
      const waterLevels = hours.map((_, i) => {
        const surge = Math.sin(i / 3.8) * 0.9 + (state.risk ? state.risk.score / 60 : 0.4);
        return +(baseLevel + Math.max(0.2, surge)).toFixed(2);
      });

      primaryChart = new Chart(canvas, {
        type: "line",
        data: {
          labels: hours,
          datasets: [{
            label: "Canal Water Depth (m)",
            data: waterLevels,
            borderColor: "#38bdf8",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            fill: true,
            tension: 0.38,
            borderWidth: 2.5,
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, grid: { color: "#2d4263" }, ticks: { color: "#cbd5e1" } },
            x: { grid: { display: false }, ticks: { color: "#cbd5e1" } }
          },
          plugins: { legend: { display: false } }
        }
      });

    } else if (state.activeGraphType === "damagepie") {
      pieInfoBox.style.display = "block";
      renderPieInfoBox();

      const f = (state.risk && state.risk.breakdown) ? state.risk.breakdown : { rainScore: 30, elevScore: 40, drainScore: 35, soilScore: 50 };

      primaryChart = new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: ["🌧️ Rain Load", "⛰️ Low Ground Sump", "🚰 Clogged Drain", "🌱 Saturated Soil"],
          datasets: [{
            data: [
              Math.round(f.rainScore * 0.35),
              Math.round(f.elevScore * 0.20),
              Math.round(f.drainScore * 0.20),
              Math.round(f.soilScore * 0.15)
            ],
            backgroundColor: ["#38bdf8", "#fbbf24", "#f97316", "#ef4444"],
            borderColor: "#162447",
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: { color: "#ffffff", font: { family: "Plus Jakarta Sans", size: 11 } }
            }
          }
        }
      });

    } else if (state.activeGraphType === "history") {
      pieInfoBox.style.display = "none";
      const days = ["6 Days Ago", "5 Days Ago", "4 Days Ago", "3 Days Ago", "2 Days Ago", "Yesterday", "Today"];
      const history = [4.2, 8.5, 0.0, 12.4, 28.0, 42.5, parseFloat(document.getElementById("kpi-rain-1h").textContent) * 3 || 15.0];

      primaryChart = new Chart(canvas, {
        type: "line",
        data: {
          labels: days,
          datasets: [{
            label: "Total Rain (mm)",
            data: history,
            borderColor: "#4ade80",
            backgroundColor: "rgba(74, 222, 128, 0.15)",
            fill: true,
            tension: 0.3,
            borderWidth: 2.5,
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, grid: { color: "#2d4263" }, ticks: { color: "#cbd5e1" } },
            x: { grid: { display: false }, ticks: { color: "#cbd5e1" } }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  function renderPieInfoBox() {
    const list = document.getElementById("pie-metrics-list");
    if (!list) return;

    const f = (state.risk && state.risk.breakdown) ? state.risk.breakdown : { rainScore: 30, elevScore: 40, drainScore: 35, soilScore: 50 };

    list.innerHTML = `
      <div class="pie-metric-chip">
        <span>🌧️ Rain Load</span>
        <strong>${Math.round(f.rainScore)}% Impact</strong>
      </div>
      <div class="pie-metric-chip">
        <span>⛰️ Low Sump</span>
        <strong>${Math.round(f.elevScore)}% Sump</strong>
      </div>
      <div class="pie-metric-chip">
        <span>🚰 Blocked Drain</span>
        <strong>${Math.round(f.drainScore)}% Choke</strong>
      </div>
      <div class="pie-metric-chip">
        <span>🌱 Soil Fullness</span>
        <strong>${Math.round(f.soilScore)}% Full</strong>
      </div>
    `;
  }

  function initGraphToolbar() {
    document.querySelectorAll(".graph-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".graph-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeGraphType = btn.getAttribute("data-graph");
        renderActiveGraph();
      });
    });
  }

  // --- INSPECT CITY / VILLAGE TELEMETRY (FLASK API: /api/assess-risk) ---
  async function inspectBasin(lat, lon, name) {
    logAudit(`Checking live satellite data for: ${name}...`);

    state.activeLocation.lat = lat;
    state.activeLocation.lon = lon;
    state.activeLocation.name = name;

    const nameEl = document.getElementById("kpi-loc-name");
    nameEl.textContent = name;
    nameEl.className = "kpi-main-val place-name-en";

    document.getElementById("kpi-loc-coords").textContent = `${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`;
    document.getElementById("last-update-time").textContent = new Date().toLocaleTimeString();

    // 1. Live Elevation
    const elev = await OpenMeteoService.fetchElevation(lat, lon);
    state.activeLocation.elevation = Math.round(elev);
    document.getElementById("kpi-elevation").textContent = state.activeLocation.elevation;
    
    const dict = i18nDict[state.currentLang] || i18nDict.en;
    document.getElementById("kpi-sump-risk").textContent = state.activeLocation.elevation <= 12 ? dict.lowGroundNote : dict.highGroundNote;

    // 2. Live Weather
    const weather = await OpenMeteoService.fetchForecast(lat, lon);
    state.weather = weather;

    const rain1h = weather.current ? weather.current.precipitation : 0.0;
    document.getElementById("kpi-rain-1h").textContent = rain1h.toFixed(1);

    let rain24h = 0.0;
    if (weather.hourly && weather.hourly.precipitation) {
      rain24h = weather.hourly.precipitation.slice(0, 24).reduce((a, b) => a + b, 0);
    }
    document.getElementById("kpi-rain-24h").textContent = `${rain24h.toFixed(1)} mm`;

    // 3. Flask Backend Call
    let assessment;
    try {
      const riskResponse = await fetch("/api/assess-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: lat,
          lon: lon,
          name: name,
          rain_1h: rain1h,
          rain_24h: rain24h,
          elevation: state.activeLocation.elevation,
          drain_blockage: 38.0,
          soil_moisture: 72.0
        })
      });

      if (!riskResponse.ok) throw new Error("Flask assessment API error");
      assessment = await riskResponse.json();
    } catch (err) {
      console.warn("Backend unavailable, using client fallback:", err);
      const rScore = Math.min(100, (rain1h / 50.0) * 60 + (rain24h / 120.0) * 40);
      const eScore = state.activeLocation.elevation <= 5 ? 95 : (state.activeLocation.elevation <= 15 ? 75 : 50);
      const composite = (rScore * 0.35) + (eScore * 0.20) + (38 * 0.20) + (72 * 0.15);
      const score = Math.round(composite * 10) / 10;
      assessment = {
        score: score,
        category: score >= 75 ? "CRITICAL" : (score >= 55 ? "HIGH" : (score >= 30 ? "MODERATE" : "LOW")),
        actions: ["Monitor river stage gauges.", "Keep road gullies clear."],
        breakdown: { rainScore: rScore, elevScore: eScore, drainScore: 38, soilScore: 72 }
      };
    }
    state.risk = assessment;

    // 4. Update Metric Display
    document.getElementById("kpi-risk-score").textContent = assessment.score;
    const categoryTag = document.getElementById("kpi-risk-category");
    categoryTag.textContent = assessment.category;
    categoryTag.className = `risk-pill risk-${assessment.category}`;

    const cardThreat = document.getElementById("card-threat-container");
    if (assessment.category === "CRITICAL" || assessment.category === "HIGH") {
      cardThreat.style.borderTopColor = "#ef4444";
      document.getElementById("top-advisory-strip").className = "advisory-strip danger-active";
      document.getElementById("threat-flag").className = "threat-flag danger-bg";
      document.getElementById("threat-flag").textContent = "🚨 DANGER FLOOD WARNING";
      document.getElementById("threat-message").textContent = `Critical waterlogging predicted in ${name}. Evacuate low subways.`;

      triggerEmergencyAlert(
        `Critical Danger: ${name}`,
        `Flood risk score is ${assessment.score}/100. Heavy water accumulation expected on low roads.`,
        "danger"
      );
    } else {
      cardThreat.style.borderTopColor = "#eab308";
      document.getElementById("top-advisory-strip").className = "advisory-strip";
      document.getElementById("threat-flag").className = "threat-flag";
      document.getElementById("threat-flag").textContent = "📢 CITY RAIN WATCH";
      document.getElementById("threat-message").textContent = `Live rain telemetry streaming for ${name}. Conditions manageable.`;
    }

    // 5. Diagnostics Progress Bars
    const breakdown = assessment.breakdown || { rainScore: 30, elevScore: 50 };
    document.getElementById("diag-rain-val").textContent = `${Math.round(breakdown.rainScore)} / 100`;
    document.getElementById("meter-rain").style.width = `${breakdown.rainScore}%`;

    document.getElementById("diag-elev-val").textContent = `${Math.round(breakdown.elevScore)} / 100`;
    document.getElementById("meter-elev").style.width = `${breakdown.elevScore}%`;

    const mitigations = document.getElementById("mitigation-actions-list");
    mitigations.innerHTML = "";
    assessment.actions.forEach(a => {
      const li = document.createElement("li");
      li.textContent = a;
      mitigations.appendChild(li);
    });

    buildFloodHeatMap(lat, lon, assessment);
    if (mapInstance) mapInstance.panTo([lat, lon]);

    renderActiveGraph();
    logAudit(`Live calculations done. Status: ${assessment.category} (${assessment.score}/100)`);
  }

  // --- PRE-LAUNCH LOCATION GATE ---
  function initLocationSetupModal() {
    const modal = document.getElementById("location-setup-modal");
    const turnOnGpsBtn = document.getElementById("btn-turn-on-gps");
    const useDefaultBtn = document.getElementById("btn-use-default-loc");
    const customInput = document.getElementById("modal-custom-location");
    const suggestionsBox = document.getElementById("modal-suggestions");

    turnOnGpsBtn.addEventListener("click", () => {
      turnOnGpsBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Getting GPS...`;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const areaName = `Your GPS Location (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`;

            modal.classList.add("hidden");
            inspectBasin(lat, lon, areaName);
            triggerEmergencyAlert("GPS Synced", `Monitoring live conditions for your current location.`, "success");
          },
          (err) => {
            alert("Could not access your location. Using default location (Vijayawada).");
            modal.classList.add("hidden");
            inspectBasin(16.5186, 80.6195, "Vijayawada (Krishna River)");
          },
          { timeout: 9000, enableHighAccuracy: true }
        );
      } else {
        alert("Geolocation is not supported by your browser. Using Vijayawada.");
        modal.classList.add("hidden");
        inspectBasin(16.5186, 80.6195, "Vijayawada (Krishna River)");
      }
    });

    useDefaultBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      inspectBasin(16.5186, 80.6195, "Vijayawada (Krishna River)");
    });

    let debounceTimer;
    customInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      const q = customInput.value.trim();
      if (q.length < 1) {
        suggestionsBox.classList.remove("active");
        return;
      }

      debounceTimer = setTimeout(async () => {
        const places = await OpenMeteoService.searchPlaces(q, 5);
        if (!places.length) {
          suggestionsBox.innerHTML = `<div class="suggestion-item"><span class="suggestion-main">No locations found</span></div>`;
          suggestionsBox.classList.add("active");
          return;
        }

        suggestionsBox.innerHTML = "";
        places.forEach(p => {
          const item = document.createElement("div");
          item.className = "suggestion-item";
          const admin = [p.admin1, p.country].filter(Boolean).join(", ");
          item.innerHTML = `<span class="suggestion-main place-name-en">${p.name}</span><span class="suggestion-sub place-name-en">${admin}</span>`;
          item.addEventListener("click", () => {
            modal.classList.add("hidden");
            inspectBasin(p.latitude, p.longitude, p.name);
          });
          suggestionsBox.appendChild(item);
        });
        suggestionsBox.classList.add("active");
      }, 150);
    });
  }

  // --- AUTO-SUGGEST SEARCH WITH SPEECH RECOGNITION (MIC) ---
  function initAutoSuggestSearch() {
    const input = document.getElementById("basin-search-input");
    const btn = document.getElementById("btn-search-basin");
    const micBtn = document.getElementById("btn-voice-search");
    const suggestionsBox = document.getElementById("search-suggestions-box");
    let debounceTimer = null;

    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      const query = input.value.trim();

      if (query.length < 1) {
        suggestionsBox.innerHTML = "";
        suggestionsBox.classList.remove("active");
        return;
      }

      debounceTimer = setTimeout(async () => {
        const places = await OpenMeteoService.searchPlaces(query, 6);

        if (!places || places.length === 0) {
          suggestionsBox.innerHTML = `<div class="suggestion-item"><span class="suggestion-main">No locations found</span><span class="suggestion-sub">Check spelling</span></div>`;
          suggestionsBox.classList.add("active");
          return;
        }

        suggestionsBox.innerHTML = "";
        places.forEach(p => {
          const item = document.createElement("div");
          item.className = "suggestion-item";

          const adminArea = [p.admin1, p.country].filter(Boolean).join(", ");
          item.innerHTML = `
            <div>
              <span class="suggestion-main place-name-en">${p.name}</span>
              <span class="suggestion-sub place-name-en">${adminArea}</span>
            </div>
            <span class="suggestion-meta">${p.latitude.toFixed(2)}°, ${p.longitude.toFixed(2)}°</span>
          `;

          item.addEventListener("click", () => {
            input.value = `${p.name}`;
            suggestionsBox.classList.remove("active");
            document.querySelectorAll(".chip-btn").forEach(b => b.classList.remove("active"));
            inspectBasin(p.latitude, p.longitude, p.name);
          });

          suggestionsBox.appendChild(item);
        });

        suggestionsBox.classList.add("active");
      }, 150);
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.classList.remove("active");
      }
    });

    if (micBtn) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        micBtn.addEventListener("click", () => {
          micBtn.classList.add("listening");
          logAudit("Microphone listening... Speak place name in English.");

          try {
            recognition.start();
          } catch (err) {
            recognition.stop();
            micBtn.classList.remove("listening");
          }
        });

        recognition.onresult = (event) => {
          micBtn.classList.remove("listening");
          const transcript = event.results[0][0].transcript.replace(/\.$/, "").trim();
          input.value = transcript;
          logAudit(`Voice recognized in English: "${transcript}"`);
          runDirectSearch();
        };

        recognition.onerror = () => {
          micBtn.classList.remove("listening");
          logAudit("Speech recognition cancelled or timed out.");
        };

        recognition.onend = () => {
          micBtn.classList.remove("listening");
        };
      } else {
        micBtn.style.opacity = "0.5";
        micBtn.title = "Voice recognition not supported in this browser.";
      }
    }

    const runDirectSearch = async () => {
      const q = input.value.trim();
      if (!q) return;

      suggestionsBox.classList.remove("active");
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ...`;
      const places = await OpenMeteoService.searchPlaces(q, 1);
      btn.innerHTML = i18nDict[state.currentLang].checkRiskBtn;

      if (places && places.length > 0) {
        const p = places[0];
        document.querySelectorAll(".chip-btn").forEach(b => b.classList.remove("active"));
        inspectBasin(p.latitude, p.longitude, `${p.name}`);
      } else {
        alert("Location not found. Please try another place name.");
      }
    };

    btn.addEventListener("click", runDirectSearch);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        runDirectSearch();
      }
    });

    document.querySelectorAll(".preset-group .chip-btn").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".preset-group .chip-btn").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");

        const lat = parseFloat(chip.dataset.lat);
        const lon = parseFloat(chip.dataset.lon);
        const name = chip.dataset.name;
        input.value = name;
        suggestionsBox.classList.remove("active");
        inspectBasin(lat, lon, name);
      });
    });
  }

  // --- SIMULATOR CONTROLLER ---
  function initSimulator() {
    const sRain = document.getElementById("sim-input-rain");
    const sDur = document.getElementById("sim-input-dur");
    const sBlock = document.getElementById("sim-input-block");
    const sSoil = document.getElementById("sim-input-soil");

    sRain.oninput = () => document.getElementById("sim-disp-rain").textContent = `${sRain.value} mm/hr`;
    sDur.oninput = () => document.getElementById("sim-disp-dur").textContent = `${sDur.value} Hours`;
    sBlock.oninput = () => document.getElementById("sim-disp-block").textContent = `${sBlock.value}% Blocked`;
    sSoil.oninput = () => document.getElementById("sim-disp-soil").textContent = `${sSoil.value}% Wet`;

    const runSim = async () => {
      const r = parseFloat(sRain.value);
      const d = parseFloat(sDur.value);
      const b = parseFloat(sBlock.value);
      const s = parseFloat(sSoil.value);

      let simData;
      try {
        const simResponse = await fetch("/api/simulate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rain_rate: r,
            duration: d,
            blockage: b,
            soil: s,
            elevation: state.activeLocation.elevation
          })
        });

        if (!simResponse.ok) throw new Error("Simulator API error");
        simData = await simResponse.json();

        document.getElementById("sim-val-base").textContent = simData.baseline_score;
        document.getElementById("sim-val-sim").textContent = simData.simulated_score;
        document.getElementById("sim-tag-result").textContent = simData.simulated_category;
        document.getElementById("sim-tag-result").className = `risk-pill risk-${simData.simulated_category}`;
        document.getElementById("sim-val-delta").textContent = `+${simData.delta} Points`;

        const list = document.getElementById("sim-mitigation-list");
        list.innerHTML = "";
        simData.actions.forEach(a => {
          const li = document.createElement("li");
          li.textContent = a;
          list.appendChild(li);
        });

      } catch (err) {
        console.warn("Backend simulator offline, calculating fallback:", err);
        const rScore = Math.min(100, (r / 50.0) * 60 + ((r * d) / 120.0) * 40);
        const simScore = Math.round(((rScore * 0.35) + (50 * 0.20) + (b * 0.20) + (s * 0.15)) * 10) / 10;
        simData = { simulated_score: simScore };
      }

      const narr = document.getElementById("sim-narrative-text");
      if (simData.simulated_score >= 75) {
        narr.textContent = `Severe storm overload: Drain pipes will overflow. More than 2 feet of water on streets.`;
        triggerEmergencyAlert("Simulator: Severe Inundation", `Score shoots up to ${simData.simulated_score}/100! Immediate pump action needed.`, "danger");
      } else if (simData.simulated_score >= 50) {
        narr.textContent = `High risk: Road curb water will pool up and vehicles might get stuck.`;
      } else {
        narr.textContent = `Water will drain away properly without flooding homes.`;
      }

      logAudit(`Test simulated: ${r}mm rain for ${d}h.`);
    };

    document.getElementById("btn-run-sim").addEventListener("click", runSim);

    document.getElementById("btn-reset-sim").addEventListener("click", () => {
      sRain.value = 75;
      sDur.value = 3.5;
      sBlock.value = 45;
      sSoil.value = 80;
      sRain.oninput(); sDur.oninput(); sBlock.oninput(); sSoil.oninput();
      runSim();
      logAudit("Test parameters reset.");
    });
  }

  // --- REPORT FORM & DATABASE INTEGRATION ---
  function initReporting() {
    const form = document.getElementById("form-report");
    fetchReportsFromBackend();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newReport = {
        location: document.getElementById("rep-location").value.trim(),
        lat: parseFloat(document.getElementById("rep-lat").value),
        lon: parseFloat(document.getElementById("rep-lon").value),
        type: document.getElementById("rep-type").value,
        severity: document.getElementById("rep-severity").value,
        desc: document.getElementById("rep-desc").value.trim(),
        created_at: "Just now"
      };

      try {
        const res = await fetch("/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: newReport.location,
            lat: newReport.lat,
            lon: newReport.lon,
            type: newReport.type,
            severity: newReport.severity,
            desc: newReport.desc
          })
        });

        if (res.ok) {
          await fetchReportsFromBackend();
        } else {
          throw new Error("Failed to post report to backend");
        }
      } catch (err) {
        console.warn("Backend offline, saving locally:", err);
        state.reports.unshift(newReport);
        renderReports();
      }

      form.reset();
      inspectBasin(state.activeLocation.lat, state.activeLocation.lon, state.activeLocation.name);

      triggerEmergencyAlert("Report Received", `New ${newReport.severity} report logged for ${newReport.location}.`, "warning");
    });

    document.getElementById("btn-purge-reports").addEventListener("click", async () => {
      try {
        await fetch("/api/reports/reset", { method: "POST" });
      } catch (e) {
        console.warn("Reset locally");
      }
      state.reports = [];
      renderReports();
      logAudit("Citizen complaints reset.");
    });
  }

  async function fetchReportsFromBackend() {
    try {
      const res = await fetch("/api/reports");
      if (res.ok) {
        state.reports = await res.json();
      } else {
        throw new Error();
      }
    } catch (e) {
      state.reports = [
        { location: "One Town Canal Lane", latitude: 16.5190, longitude: 80.6180, problem_type: "Water Standing on Road", severity: "HIGH", description: "Knee-deep water accumulating.", created_at: "12m ago" }
      ];
    }
    renderReports();
  }

  // --- ACTIONS & PERMISSIONS ---
  function initActions() {
    const langSelector = document.getElementById("lang-selector");
    if (langSelector) {
      langSelector.addEventListener("change", (e) => {
        applyLanguage(e.target.value);
        logAudit(`Language changed to ${e.target.options[e.target.selectedIndex].text}`);
      });
    }

    document.getElementById("btn-enable-notifications").addEventListener("click", () => {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            triggerEmergencyAlert("Notifications Enabled", "You will now receive popup notifications for high flood danger!", "success");
          } else {
            alert("Notification permission denied. In-app alerts remain active.");
          }
        });
      } else {
        alert("Push notifications not supported, but on-screen alerts are active!");
      }
    });

    document.getElementById("btn-broadcast-alert").addEventListener("click", () => {
      triggerEmergencyAlert("RED ALERT: Immediate Evacuation Notice", `Emergency alert issued for ${state.activeLocation.name}. Severe inundation warning sent to emergency response teams.`, "danger");
    });

    document.getElementById("btn-dispatch-crews").addEventListener("click", function () {
      this.classList.add("btn-glass");
      this.innerHTML = `<i class="fa-solid fa-check"></i> Cleaning Truck Dispatched!`;
      triggerEmergencyAlert("Truck Dispatched", `High-power drain suction truck has been assigned to clear choked drains in ${state.activeLocation.name}.`, "success");
    });
  }

  // --- BOOTSTRAP LIFECYCLE ---
  window.addEventListener("DOMContentLoaded", () => {
    initClock();
    initTabs();
    initMap();
    init3DTiltEffects();
    initGraphToolbar();
    initSimulator();
    initReporting();
    initAutoSuggestSearch();
    initLocationSetupModal();
    initActions();

    // Default startup inspection: Vijayawada
    inspectBasin(state.activeLocation.lat, state.activeLocation.lon, state.activeLocation.name);
    document.getElementById("btn-run-sim").click();
  });

})();