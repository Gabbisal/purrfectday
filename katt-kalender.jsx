import { useState, useEffect, useRef, useCallback } from "react";

// ==================== SWEDISH NAME DAYS DATA ====================
const NAME_DAYS = {
  "1-1": ["Nyårsdagen"],
  "1-2": ["Svea", "Yvette"],
  "1-3": ["Alfred", "Alfrida"],
  "1-4": ["Rut", "Ritva"],
  "1-5": ["Hanna", "Hannele"],
  "1-6": ["Baltsar", "Kasper", "Melker"],
  "1-7": ["August", "Augusta"],
  "1-8": ["Erland"],
  "1-9": ["Gunnar", "Gunder"],
  "1-10": ["Sigurd", "Sigbritt"],
  "1-11": ["Jan", "Jansen"],
  "1-12": ["Frideborg", "Fridolf"],
  "1-13": ["Knut"],
  "1-14": ["Felix", "Felicia"],
  "1-15": ["Laura", "Lorentz"],
  "1-16": ["Hjalmar", "Helmer"],
  "1-17": ["Anton", "Tony"],
  "1-18": ["Hilda", "Hildur"],
  "1-19": ["Henrik"],
  "1-20": ["Fabian", "Sebastian"],
  "1-21": ["Agnes", "Agneta"],
  "1-22": ["Vincent", "Viktor"],
  "1-23": ["Frej", "Freja"],
  "1-24": ["Erika", "Eira"],
  "1-25": ["Paul", "Pål"],
  "1-26": ["Bodil", "Boel"],
  "1-27": ["Göte", "Göta"],
  "1-28": ["Karl", "Karla"],
  "1-29": ["Diana"],
  "1-30": ["Gunilla", "Gunhild"],
  "1-31": ["Ivar", "Joar"],
  "2-1": ["Max", "Maximilian"],
  "2-2": ["Kyndelsmässodagen"],
  "2-3": ["Disa", "Hjördis"],
  "2-4": ["Ansgar", "Anselm"],
  "2-5": ["Agata", "Agda"],
  "2-6": ["Dorotea", "Doris"],
  "2-7": ["Rikard", "Dick"],
  "2-8": ["Berta", "Bert"],
  "2-9": ["Fanny", "Franciska"],
  "2-10": ["Iris"],
  "2-11": ["Yngve", "Inge"],
  "2-12": ["Evelina", "Evy"],
  "2-13": ["Agne", "Ove"],
  "2-14": ["Valentin"],
  "2-15": ["Sigfrid"],
  "2-16": ["Julia", "Julius"],
  "2-17": ["Alexandra", "Alex"],
  "2-18": ["Frida", "Fritiof"],
  "2-19": ["Gabriella", "Ella"],
  "2-20": ["Vivianne"],
  "2-21": ["Hilding"],
  "2-22": ["Pia"],
  "2-23": ["Torsten", "Torun"],
  "2-24": ["Mattias", "Mats"],
  "2-25": ["Sigvard", "Sivert"],
  "2-26": ["Torgny", "Torkel"],
  "2-27": ["Lage"],
  "2-28": ["Maria"],
  "3-1": ["Albin", "Elvira"],
  "3-2": ["Ernst", "Erna"],
  "3-3": ["Gunborg", "Gunvor"],
  "3-4": ["Adrian", "Adriana"],
  "3-5": ["Tora", "Tove"],
  "3-6": ["Ebba", "Ebbe"],
  "3-7": ["Camilla"],
  "3-8": ["Siv"],
  "3-9": ["Torbjörn", "Torleif"],
  "3-10": ["Edla", "Ada"],
  "3-11": ["Edvin", "Egon"],
  "3-12": ["Viktoria"],
  "3-13": ["Greger"],
  "3-14": ["Matilda", "Maud"],
  "3-15": ["Kristoffer", "Christel"],
  "3-16": ["Herbert", "Gilbert"],
  "3-17": ["Gertrud"],
  "3-18": ["Edvard", "Edmund"],
  "3-19": ["Josef", "Josefina"],
  "3-20": ["Joakim", "Kim"],
  "3-21": ["Bengt"],
  "3-22": ["Kennet", "Kent"],
  "3-23": ["Gerda", "Gerd"],
  "3-24": ["Gabriel", "Rafael"],
  "3-25": ["Marie", "Bebådelsedag"],
  "3-26": ["Emanuel"],
  "3-27": ["Rudolf", "Ralf"],
  "3-28": ["Malkolm", "Morgan"],
  "3-29": ["Jonas", "Jens"],
  "3-30": ["Holger", "Holmfrid"],
  "3-31": ["Ester"],
  "4-1": ["Harald", "Hervor"],
  "4-2": ["Gudmund", "Ingemund"],
  "4-3": ["Ferdinand", "Nanna"],
  "4-4": ["Marianne", "Marlene"],
  "4-5": ["Irene", "Irja"],
  "4-6": ["Vilhelm", "Helmi"],
  "4-7": ["Irma", "Irmelin"],
  "4-8": ["Nadja", "Tanja"],
  "4-9": ["Otto", "Ottilia"],
  "4-10": ["Ingvar", "Ingvor"],
  "4-11": ["Ulf", "Ylva"],
  "4-12": ["Liv"],
  "4-13": ["Artur", "Douglas"],
  "4-14": ["Tiburtius"],
  "4-15": ["Olivia", "Oliver"],
  "4-16": ["Patrik", "Patricia"],
  "4-17": ["Elias", "Elis"],
  "4-18": ["Valdemar", "Volmar"],
  "4-19": ["Olaus", "Ola"],
  "4-20": ["Amalia", "Amelie"],
  "4-21": ["Anneli", "Annika"],
  "4-22": ["Allan", "Glenn"],
  "4-23": ["Georg", "Göran"],
  "4-24": ["Vega"],
  "4-25": ["Markus"],
  "4-26": ["Teresia", "Terese"],
  "4-27": ["Engelbrekt"],
  "4-28": ["Ture", "Tyra"],
  "4-29": ["Tyko"],
  "4-30": ["Mariana", "Valborg"],
  "5-1": ["Första maj"],
  "5-2": ["Filip", "Filippa"],
  "5-3": ["John", "Jane"],
  "5-4": ["Monika", "Mona"],
  "5-5": ["Gotthard", "Erhard"],
  "5-6": ["Marit", "Rita"],
  "5-7": ["Carina", "Carita"],
  "5-8": ["Åke"],
  "5-9": ["Reidar", "Reidunn"],
  "5-10": ["Esbjörn", "Styrbjörn"],
  "5-11": ["Märta", "Märit"],
  "5-12": ["Charlotta", "Lotta"],
  "5-13": ["Linnea", "Linn"],
  "5-14": ["Halvard", "Halvar"],
  "5-15": ["Sofia", "Sonja"],
  "5-16": ["Ronald", "Ronny"],
  "5-17": ["Rebecka", "Ruben"],
  "5-18": ["Erik"],
  "5-19": ["Maj", "Majken"],
  "5-20": ["Karolina", "Carola"],
  "5-21": ["Konstantin", "Conny"],
  "5-22": ["Hemming", "Henning"],
  "5-23": ["Desideria", "Desirée"],
  "5-24": ["Ivan", "Vanja"],
  "5-25": ["Urban"],
  "5-26": ["Vilhelmina", "Vilma"],
  "5-27": ["Beda", "Blenda"],
  "5-28": ["Ingeborg", "Borghild"],
  "5-29": ["Yvonne", "Jeanette"],
  "5-30": ["Vera", "Veronika"],
  "5-31": ["Petronella", "Pernilla"],
  "6-1": ["Gun", "Gunnel"],
  "6-2": ["Rutger", "Roger"],
  "6-3": ["Ingemar", "Gudmar"],
  "6-4": ["Solbritt", "Solveig"],
  "6-5": ["Bo"],
  "6-6": ["Gustav", "Nationaldagen"],
  "6-7": ["Robert", "Robin"],
  "6-8": ["Eivor", "Majvor"],
  "6-9": ["Börje", "Birger"],
  "6-10": ["Svante", "Boris"],
  "6-11": ["Bertil", "Berthold"],
  "6-12": ["Eskil"],
  "6-13": ["Aina", "Aino"],
  "6-14": ["Håkan", "Hakon"],
  "6-15": ["Margit", "Margot"],
  "6-16": ["Axel", "Axelina"],
  "6-17": ["Torborg", "Torvald"],
  "6-18": ["Björn", "Bjarne"],
  "6-19": ["Germund", "Görel"],
  "6-20": ["Linda"],
  "6-21": ["Alf", "Alvar"],
  "6-22": ["Paulina", "Paula"],
  "6-23": ["Adolf", "Alice"],
  "6-24": ["Johannes Döparens dag"],
  "6-25": ["David", "Salomon"],
  "6-26": ["Rakel", "Lea"],
  "6-27": ["Selma", "Fingal"],
  "6-28": ["Leo"],
  "6-29": ["Peter", "Petra"],
  "6-30": ["Elof", "Leif"],
  "7-1": ["Aron", "Mirjam"],
  "7-2": ["Rosa", "Rosita"],
  "7-3": ["Aurora"],
  "7-4": ["Ulrika", "Ulla"],
  "7-5": ["Laila", "Ritva"],
  "7-6": ["Esaias", "Jessika"],
  "7-7": ["Klas"],
  "7-8": ["Kjell"],
  "7-9": ["Jörgen", "Örjan"],
  "7-10": ["André", "Andrea"],
  "7-11": ["Eleonora", "Ellinor"],
  "7-12": ["Herman", "Hermine"],
  "7-13": ["Joel", "Judit"],
  "7-14": ["Folke"],
  "7-15": ["Ragnhild", "Ragnvald"],
  "7-16": ["Reinhold", "Reine"],
  "7-17": ["Bruno"],
  "7-18": ["Fredrik", "Fritz"],
  "7-19": ["Sara"],
  "7-20": ["Margareta", "Greta"],
  "7-21": ["Johanna"],
  "7-22": ["Magdalena", "Madeleine"],
  "7-23": ["Emma"],
  "7-24": ["Kristina", "Kerstin"],
  "7-25": ["Jakob"],
  "7-26": ["Jesper"],
  "7-27": ["Marta"],
  "7-28": ["Botvid", "Seved"],
  "7-29": ["Olof"],
  "7-30": ["Algot"],
  "7-31": ["Helena", "Elin"],
  "8-1": ["Per"],
  "8-2": ["Karin", "Kajsa"],
  "8-3": ["Tage"],
  "8-4": ["Arne", "Arnold"],
  "8-5": ["Ulrik", "Alrik"],
  "8-6": ["Alfons", "Inez"],
  "8-7": ["Dennis", "Denise"],
  "8-8": ["Silvia", "Sylvia"],
  "8-9": ["Roland"],
  "8-10": ["Lars"],
  "8-11": ["Susanna"],
  "8-12": ["Klara"],
  "8-13": ["Kaj"],
  "8-14": ["Uno"],
  "8-15": ["Stella", "Estelle"],
  "8-16": ["Brynolf"],
  "8-17": ["Verner", "Valter"],
  "8-18": ["Ellen", "Lena"],
  "8-19": ["Magnus", "Måns"],
  "8-20": ["Bernhard", "Bernt"],
  "8-21": ["Jon", "Jansen"],
  "8-22": ["Henrietta", "Henrika"],
  "8-23": ["Signe", "Signhild"],
  "8-24": ["Bartolomeus"],
  "8-25": ["Lovisa", "Louise"],
  "8-26": ["Östen"],
  "8-27": ["Rolf", "Raoul"],
  "8-28": ["Fatima", "Leila"],
  "8-29": ["Hans", "Hampus"],
  "8-30": ["Albert", "Albertina"],
  "8-31": ["Arvid", "Vidar"],
  "9-1": ["Samuel"],
  "9-2": ["Justus", "Justina"],
  "9-3": ["Alfhild", "Alva"],
  "9-4": ["Gisela"],
  "9-5": ["Adela", "Heidi"],
  "9-6": ["Lilian"],
  "9-7": ["Regina", "Roy"],
  "9-8": ["Alma", "Hulda"],
  "9-9": ["Anita", "Annette"],
  "9-10": ["Tord", "Turid"],
  "9-11": ["Dagny", "Helny"],
  "9-12": ["Åsa", "Åslög"],
  "9-13": ["Sture"],
  "9-14": ["Ida"],
  "9-15": ["Sigrid", "Siri"],
  "9-16": ["Dag", "Daga"],
  "9-17": ["Hildegard", "Magnhild"],
  "9-18": ["Orvar"],
  "9-19": ["Fredrika"],
  "9-20": ["Elise", "Lisa"],
  "9-21": ["Matteus"],
  "9-22": ["Maurits", "Moritz"],
  "9-23": ["Tekla", "Tea"],
  "9-24": ["Gerhard", "Gert"],
  "9-25": ["Tryggve"],
  "9-26": ["Enar", "Einar"],
  "9-27": ["Dagmar", "Rigmor"],
  "9-28": ["Lennart", "Leonard"],
  "9-29": ["Mikael", "Mikaela"],
  "9-30": ["Helge"],
  "10-1": ["Ragnar", "Ragna"],
  "10-2": ["Ludvig", "Louis"],
  "10-3": ["Evald", "Osvald"],
  "10-4": ["Frans", "Frank"],
  "10-5": ["Bror"],
  "10-6": ["Jenny", "Jennifer"],
  "10-7": ["Birgitta", "Britta"],
  "10-8": ["Nils"],
  "10-9": ["Ingrid", "Inger"],
  "10-10": ["Harry", "Harriet"],
  "10-11": ["Erling", "Jarl"],
  "10-12": ["Valfrid", "Manfred"],
  "10-13": ["Berit", "Birgit"],
  "10-14": ["Stellan"],
  "10-15": ["Hedvig", "Hillevi"],
  "10-16": ["Finn"],
  "10-17": ["Antonia", "Toini"],
  "10-18": ["Lukas"],
  "10-19": ["Tore", "Tor"],
  "10-20": ["Sibylla"],
  "10-21": ["Ursula", "Yrsa"],
  "10-22": ["Marika", "Marita"],
  "10-23": ["Severin", "Sören"],
  "10-24": ["Evert", "Eilert"],
  "10-25": ["Inga", "Ingalill"],
  "10-26": ["Amanda", "Rasmus"],
  "10-27": ["Sabina"],
  "10-28": ["Simon", "Simone"],
  "10-29": ["Viola"],
  "10-30": ["Elsa", "Isabella"],
  "10-31": ["Edit", "Edgar"],
  "11-1": ["Allhelgonadagen"],
  "11-2": ["Tobias"],
  "11-3": ["Hubert", "Hugo"],
  "11-4": ["Sverker"],
  "11-5": ["Eugen", "Eugenia"],
  "11-6": ["Gustaf Adolf"],
  "11-7": ["Ingegerd", "Ingela"],
  "11-8": ["Vendela"],
  "11-9": ["Teodor", "Teodora"],
  "11-10": ["Martin", "Martina"],
  "11-11": ["Mårten"],
  "11-12": ["Konrad", "Kurt"],
  "11-13": ["Kristian", "Krister"],
  "11-14": ["Emil", "Emilia"],
  "11-15": ["Leopold"],
  "11-16": ["Vibeke", "Viveka"],
  "11-17": ["Naemi", "Naima"],
  "11-18": ["Lillemor", "Moa"],
  "11-19": ["Elisabet", "Lisbet"],
  "11-20": ["Pontus", "Marina"],
  "11-21": ["Helga", "Olga"],
  "11-22": ["Cecilia", "Sissela"],
  "11-23": ["Klemens"],
  "11-24": ["Gudrun", "Rune"],
  "11-25": ["Katarina", "Katja"],
  "11-26": ["Linus"],
  "11-27": ["Astrid", "Asta"],
  "11-28": ["Malte"],
  "11-29": ["Sune"],
  "11-30": ["Andreas", "Anders"],
  "12-1": ["Oskar", "Ossian"],
  "12-2": ["Beata", "Beatrice"],
  "12-3": ["Lydia"],
  "12-4": ["Barbara", "Barbro"],
  "12-5": ["Sven"],
  "12-6": ["Nikolaus", "Niklas"],
  "12-7": ["Angela", "Angelika"],
  "12-8": ["Virginia"],
  "12-9": ["Anna"],
  "12-10": ["Malin", "Malena"],
  "12-11": ["Daniel", "Daniela"],
  "12-12": ["Alexander", "Alexis"],
  "12-13": ["Lucia"],
  "12-14": ["Sten", "Sixten"],
  "12-15": ["Gottfrid"],
  "12-16": ["Assar"],
  "12-17": ["Stig"],
  "12-18": ["Abraham"],
  "12-19": ["Isak"],
  "12-20": ["Israel", "Moses"],
  "12-21": ["Tomas"],
  "12-22": ["Natanael", "Jonatan"],
  "12-23": ["Adam"],
  "12-24": ["Eva", "Julafton"],
  "12-25": ["Juldagen"],
  "12-26": ["Stefan", "Staffan"],
  "12-27": ["Johannes", "Johan"],
  "12-28": ["Benjamin"],
  "12-29": ["Natalia", "Natalie"],
  "12-30": ["Abel", "Set"],
  "12-31": ["Sylvester"]
};

// ==================== SWEDISH HOLIDAYS 2026 ====================
const SWEDISH_HOLIDAYS_2026 = {
  "1-1": "Nyårsdagen",
  "1-6": "Trettondedag jul",
  "4-3": "Långfredagen",
  "4-5": "Påskdagen",
  "4-6": "Annandag påsk",
  "5-1": "Första maj",
  "5-14": "Kristi himmelsfärdsdag",
  "5-24": "Pingstdagen",
  "6-6": "Sveriges nationaldag",
  "6-20": "Midsommardagen",
  "10-31": "Allhelgonadagen",
  "12-24": "Julafton",
  "12-25": "Juldagen",
  "12-26": "Annandag jul",
  "12-31": "Nyårsafton",
  // Notable days (not red days but shown)
  "2-14": "Alla hjärtans dag",
  "2-17": "Fettisdagen",
  "3-8": "Internationella kvinnodagen",
  "4-30": "Valborgsmässoafton",
  "5-10": "Mors dag",
  "6-19": "Midsommarafton",
  "11-8": "Fars dag",
  "12-13": "Lucia",
};

const RED_DAYS = new Set([
  "1-1", "1-6", "4-3", "4-5", "4-6", "5-1", "5-14", "5-24",
  "6-6", "6-20", "10-31", "12-25", "12-26"
]);

// ==================== HELPERS ====================
const WEEKDAYS_SHORT = ["mån", "tis", "ons", "tors", "fre", "lör", "sön"];
const WEEKDAYS_FULL = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
const MONTHS = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function dateKey(m, d) {
  return `${m + 1}-${d}`;
}

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function getWeekDates(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  const monday = new Date(d.setDate(diff));
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i));
  }
  return dates;
}

function formatDateStr(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

// ==================== CAT SVG COMPONENT ====================
function CatIcon({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} fill="none">
      <path d="M12 20L8 6C8 6 18 12 22 16" stroke="#e8a0bf" strokeWidth="3" fill="#fce4ec" strokeLinecap="round"/>
      <path d="M52 20L56 6C56 6 46 12 42 16" stroke="#e8a0bf" strokeWidth="3" fill="#fce4ec" strokeLinecap="round"/>
      <ellipse cx="32" cy="36" rx="22" ry="20" fill="#fce4ec" stroke="#e8a0bf" strokeWidth="2.5"/>
      <ellipse cx="22" cy="32" rx="3.5" ry="4" fill="#2d2d2d"/>
      <ellipse cx="42" cy="32" rx="3.5" ry="4" fill="#2d2d2d"/>
      <ellipse cx="23" cy="31" rx="1.2" ry="1.5" fill="white"/>
      <ellipse cx="43" cy="31" rx="1.2" ry="1.5" fill="white"/>
      <ellipse cx="32" cy="38" rx="2.5" ry="2" fill="#f8bbd0"/>
      <path d="M30 41C30 41 32 43 34 41" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="34" x2="18" y2="36" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="10" y1="38" x2="18" y2="38" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="46" y1="36" x2="54" y2="34" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="46" y1="38" x2="54" y2="38" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CatWithCalendar({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M25 35L18 15C18 15 32 24 38 30" stroke="#e8a0bf" strokeWidth="3" fill="#fce4ec" strokeLinecap="round"/>
      <path d="M75 35L82 15C82 15 68 24 62 30" stroke="#e8a0bf" strokeWidth="3" fill="#fce4ec" strokeLinecap="round"/>
      <ellipse cx="50" cy="55" rx="30" ry="28" fill="#fce4ec" stroke="#e8a0bf" strokeWidth="2"/>
      <ellipse cx="38" cy="48" rx="3" ry="3.5" fill="#2d2d2d"/>
      <ellipse cx="62" cy="48" rx="3" ry="3.5" fill="#2d2d2d"/>
      <ellipse cx="39" cy="47" rx="1" ry="1.2" fill="white"/>
      <ellipse cx="63" cy="47" rx="1" ry="1.2" fill="white"/>
      <ellipse cx="50" cy="54" rx="2.5" ry="2" fill="#f8bbd0"/>
      <path d="M48 57C48 57 50 59 52 57" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="35" y="62" rx="4" width="30" height="24" fill="white" stroke="#e8a0bf" strokeWidth="1.5"/>
      <rect x="35" y="62" rx="4" width="30" height="8" fill="#f8bbd0"/>
      <text x="50" y="69" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
        {MONTHS[new Date().getMonth()].substring(0, 3).toUpperCase()}
      </text>
      <text x="50" y="82" textAnchor="middle" fill="#e8a0bf" fontSize="12" fontWeight="bold">
        {new Date().getDate()}
      </text>
    </svg>
  );
}

function SleepyCat({ size = 40 }) {
  return <span style={{ fontSize: size * 0.6 }}>😸</span>;
}

// ==================== NOTIFICATION SYSTEM ====================
function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function sendNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body, icon: "🐱" });
  }
}

// ==================== MAIN APP ====================
export default function KattKalender() {
  const today = new Date();
  const [activeTab, setActiveTab] = useState("calendar");
  const [events, setEvents] = useState(() => {
    try { return JSON.parse(localStorage.getItem("kk_events") || "[]"); } catch { return []; }
  });
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("kk_notes") || "[]"); } catch { return []; }
  });
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kk_messages") || "[]");
    } catch {
      return [];
    }
  });
  const [calendarView, setCalendarView] = useState(null); // null = dashboard, "week", "month", "year"
  const [selectedDate, setSelectedDate] = useState(today);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: Date.now(),
        from: "cat",
        text: `Mjaau! 😺 Jag är din kalender-katt!\nSkriv t.ex:\n\n📅 "Möte med Anna kl 14 imorgon"\n🎂 "Lisas födelsedag 15 mars"\n📝 "Anteckning: Köpa mjölk"\n\nSå fixar jag det! 🐾`,
        time: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
      }]);
    }
    requestNotificationPermission();
  }, []);

  // Persist
  useEffect(() => { localStorage.setItem("kk_events", JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem("kk_notes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem("kk_messages", JSON.stringify(messages)); }, [messages]);

  // Scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Notification check
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      events.forEach(ev => {
        if (!ev.notified && ev.datetime) {
          const evTime = new Date(ev.datetime);
          const diff = evTime - now;
          if (diff > 0 && diff < 15 * 60 * 1000) {
            sendNotification(`🐱 Påminnelse: ${ev.title}`, `Om ${Math.round(diff / 60000)} minuter`);
            ev.notified = true;
          }
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [events]);

  // ==================== CHAT AI PARSER ====================
  const parseMessage = useCallback((text) => {
    const lower = text.toLowerCase().trim();

    // Note
    if (lower.startsWith("anteckning:") || lower.startsWith("notera:") || lower.startsWith("kom ihåg:") || lower.startsWith("note:")) {
      const noteText = text.replace(/^(anteckning|notera|kom ihåg|note):\s*/i, "").trim();
      const newNote = { id: Date.now(), text: noteText, date: new Date().toISOString() };
      setNotes(prev => [...prev, newNote]);
      return `📝 Noterat! Jag har sparat: "${noteText}" 🐾`;
    }

    // Birthday
    if (lower.includes("födelsedag") || lower.includes("fyller år")) {
      const dateMatch = text.match(/(\d{1,2})\s*(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)/i);
      const nameMatch = text.match(/^([A-Za-zÅÄÖåäö]+)s?\s*födelsedag/i) || text.match(/födelsedag\s+([A-Za-zÅÄÖåäö]+)/i);
      
      if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const monthIndex = MONTHS.indexOf(dateMatch[2].toLowerCase());
        const name = nameMatch ? nameMatch[1] : "Okänd";
        const year = today.getFullYear();
        const eventDate = new Date(year, monthIndex, day);
        if (eventDate < today) eventDate.setFullYear(year + 1);
        
        const newEvent = {
          id: Date.now(),
          title: `🎂 ${name}s födelsedag`,
          date: formatDateStr(eventDate),
          type: "birthday",
          recurring: true
        };
        setEvents(prev => [...prev, newEvent]);
        return `🎂 Jag har lagt in ${name}s födelsedag den ${day} ${MONTHS[monthIndex]}! Mjaau! 🐾`;
      }
      return "🤔 Jag förstod inte riktigt datumet. Skriv t.ex: 'Lisas födelsedag 15 mars'";
    }

    // Meeting / Event
    const timeMatch = lower.match(/kl\.?\s*(\d{1,2})[:\.]?(\d{2})?/);
    const datePatterns = [
      { regex: /imorgon/i, getDate: () => { const d = new Date(today); d.setDate(d.getDate() + 1); return d; } },
      { regex: /idag/i, getDate: () => new Date(today) },
      { regex: /i\s*övermorgon/i, getDate: () => { const d = new Date(today); d.setDate(d.getDate() + 2); return d; } },
      { regex: /på\s*(måndag|tisdag|onsdag|torsdag|fredag|lördag|söndag)/i, getDate: (m) => {
        const targetDay = ["måndag","tisdag","onsdag","torsdag","fredag","lördag","söndag"].indexOf(m[1].toLowerCase());
        const curr = today.getDay() === 0 ? 6 : today.getDay() - 1;
        let diff = targetDay - curr;
        if (diff <= 0) diff += 7;
        const d = new Date(today);
        d.setDate(d.getDate() + diff);
        return d;
      }},
      { regex: /(\d{1,2})\s*(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)/i, getDate: (m) => {
        const day = parseInt(m[1]);
        const monthIdx = MONTHS.indexOf(m[2].toLowerCase());
        const d = new Date(today.getFullYear(), monthIdx, day);
        if (d < today) d.setFullYear(d.getFullYear() + 1);
        return d;
      }},
      { regex: /(\d{1,2})\/(\d{1,2})/i, getDate: (m) => {
        const day = parseInt(m[1]);
        const month = parseInt(m[2]) - 1;
        const d = new Date(today.getFullYear(), month, day);
        if (d < today) d.setFullYear(d.getFullYear() + 1);
        return d;
      }}
    ];

    let eventDate = null;
    for (const pattern of datePatterns) {
      const match = text.match(pattern.regex);
      if (match) {
        eventDate = pattern.getDate(match);
        break;
      }
    }

    if (eventDate || timeMatch) {
      if (!eventDate) eventDate = new Date(today);
      const hour = timeMatch ? parseInt(timeMatch[1]) : null;
      const minute = timeMatch ? parseInt(timeMatch[2] || "0") : null;
      
      let title = text
        .replace(/kl\.?\s*\d{1,2}[:\.]?\d{0,2}/i, "")
        .replace(/imorgon|idag|i\s*övermorgon/gi, "")
        .replace(/på\s*(måndag|tisdag|onsdag|torsdag|fredag|lördag|söndag)/gi, "")
        .replace(/\d{1,2}\s*(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)/gi, "")
        .replace(/\d{1,2}\/\d{1,2}/g, "")
        .trim();
      
      if (!title) title = "Händelse";

      let datetime = null;
      if (hour !== null) {
        datetime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate(), hour, minute || 0);
      }

      const newEvent = {
        id: Date.now(),
        title: title,
        date: formatDateStr(eventDate),
        time: hour !== null ? `${String(hour).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}` : null,
        datetime: datetime ? datetime.toISOString() : null,
        type: "event"
      };
      setEvents(prev => [...prev, newEvent]);

      const dayName = WEEKDAYS_FULL[eventDate.getDay() === 0 ? 6 : eventDate.getDay() - 1];
      const timeStr = hour !== null ? ` kl ${String(hour).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}` : "";
      return `📅 Inlagt! "${title}" den ${eventDate.getDate()} ${MONTHS[eventDate.getMonth()]} (${dayName})${timeStr}. Mjaau! 🐾`;
    }

    // Show today
    if (lower.includes("idag") || lower.includes("vad har jag") || lower.includes("schema") || lower.includes("händer")) {
      const todayStr = formatDateStr(today);
      const todayEvents = events.filter(e => e.date === todayStr);
      if (todayEvents.length === 0) return "😺 Du har inga händelser idag! Njut av dagen! 🐾";
      return `📋 Idag har du:\n${todayEvents.map(e => `• ${e.title}${e.time ? ` kl ${e.time}` : ""}`).join("\n")}\n\nLycka till! 🐾`;
    }

    // Help
    if (lower.includes("hjälp") || lower === "?" || lower.includes("help")) {
      return `😺 Jag kan hjälpa dig med:\n\n📅 Lägg till möte: "Möte med Anna kl 14 imorgon"\n🎂 Födelsedag: "Lisas födelsedag 15 mars"\n📝 Anteckning: "Anteckning: Köpa mjölk"\n📋 Se schema: "Vad har jag idag?"\n🗑️ Ta bort: "Ta bort [namn på händelse]"\n\nMjaau! 🐾`;
    }

    // Delete
    if (lower.startsWith("ta bort") || lower.startsWith("radera")) {
      const target = text.replace(/^(ta bort|radera)\s*/i, "").trim().toLowerCase();
      const found = events.findIndex(e => e.title.toLowerCase().includes(target));
      if (found !== -1) {
        const removed = events[found].title;
        setEvents(prev => prev.filter((_, i) => i !== found));
        return `🗑️ Borttaget: "${removed}". Mjaau! 🐾`;
      }
      return "🤔 Jag hittade ingen händelse med det namnet.";
    }

    return `😺 Hmm, jag förstod inte riktigt. Skriv "hjälp" för att se vad jag kan göra! 🐾`;
  }, [events, today]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = {
      id: Date.now(),
      from: "user",
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
    };
    setMessages(prev => [...prev, userMsg]);
    
    const response = parseMessage(chatInput.trim());
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: "cat",
        text: response,
        time: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
      }]);
    }, 400);
    
    setChatInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const ds = formatDateStr(date);
    return events.filter(e => e.date === ds);
  };

  const dk = dateKey(today.getMonth(), today.getDate());
  const todayNames = NAME_DAYS[dk] || [];
  const todayHoliday = SWEDISH_HOLIDAYS_2026[dk];

  // ==================== CALENDAR VIEWS ====================

  // DAY VIEW (Dashboard)
  const DayDashboard = () => {
    const todayEvents = getEventsForDate(today);
    return (
      <div style={{ padding: "16px", paddingBottom: "80px" }}>
        {/* Date card */}
        <div style={{
          background: "linear-gradient(135deg, #fff9f0 0%, #fef0f5 100%)",
          borderRadius: 20,
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          border: "1.5px solid #f8d7e8",
          marginBottom: 16,
          cursor: "pointer",
          boxShadow: "0 2px 12px rgba(232,160,191,0.12)"
        }} onClick={() => setCalendarView("month")}>
          <CatWithCalendar size={80} />
          <div>
            <div style={{ color: "#999", fontSize: 14, fontFamily: "'Quicksand', sans-serif" }}>
              {WEEKDAYS_FULL[today.getDay() === 0 ? 6 : today.getDay() - 1]}
            </div>
            <div style={{ fontSize: 48, fontWeight: 700, color: "#2d2d2d", lineHeight: 1, fontFamily: "'Quicksand', sans-serif" }}>
              {today.getDate()}
            </div>
            <div style={{ color: "#e8a0bf", fontWeight: 600, fontSize: 14, fontFamily: "'Quicksand', sans-serif" }}>
              {MONTHS[today.getMonth()].charAt(0).toUpperCase() + MONTHS[today.getMonth()].slice(1)} {today.getFullYear()} · Vecka {getWeekNumber(today)}
            </div>
          </div>
        </div>

        {/* Name days */}
        <div style={{
          background: "linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%)",
          borderRadius: 16,
          padding: "14px 18px",
          marginBottom: 16,
          border: "1.5px solid #e1bee7"
        }}>
          <div style={{ fontSize: 13, color: "#7b1fa2", fontWeight: 600, marginBottom: 4, fontFamily: "'Quicksand', sans-serif" }}>
            🎉 Namnsdag idag
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#4a148c", fontFamily: "'Quicksand', sans-serif" }}>
            {todayNames.join(", ")}
          </div>
        </div>

        {/* Holiday */}
        {todayHoliday && (
          <div style={{
            background: "linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%)",
            borderRadius: 16,
            padding: "14px 18px",
            marginBottom: 16,
            border: "1.5px solid #ffcc80"
          }}>
            <div style={{ fontSize: 13, color: "#e65100", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>
              ⭐ {todayHoliday}
            </div>
          </div>
        )}

        {/* Today's events */}
        <div style={{ fontWeight: 700, color: "#5d4037", fontSize: 15, marginBottom: 10, fontFamily: "'Quicksand', sans-serif" }}>
          Dagens händelser
        </div>
        {todayEvents.length === 0 ? (
          <div style={{
            background: "linear-gradient(135deg, #fff9f0 0%, #fef6f0 100%)",
            borderRadius: 16,
            padding: "28px 20px",
            textAlign: "center",
            border: "1.5px solid #f8d7e8"
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>😸</div>
            <div style={{ color: "#999", fontFamily: "'Quicksand', sans-serif" }}>Inga händelser idag. Mysigt!</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {todayEvents.map(ev => (
              <div key={ev.id} style={{
                background: ev.type === "birthday" ? "linear-gradient(135deg, #fff9c4 0%, #fff3e0 100%)" : "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                borderRadius: 14,
                padding: "14px 18px",
                border: `1.5px solid ${ev.type === "birthday" ? "#ffe082" : "#bbdefb"}`,
                display: "flex",
                alignItems: "center",
                gap: 12
              }}>
                <div style={{ fontSize: 22 }}>{ev.type === "birthday" ? "🎂" : "📅"}</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#2d2d2d", fontFamily: "'Quicksand', sans-serif" }}>{ev.title}</div>
                  {ev.time && <div style={{ fontSize: 13, color: "#888", fontFamily: "'Quicksand', sans-serif" }}>kl {ev.time}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming events */}
        {events.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontWeight: 700, color: "#5d4037", fontSize: 15, marginBottom: 10, fontFamily: "'Quicksand', sans-serif" }}>
              Kommande händelser
            </div>
            {events
              .filter(e => e.date > formatDateStr(today))
              .sort((a, b) => a.date.localeCompare(b.date))
              .slice(0, 5)
              .map(ev => {
                const [y, m, d] = ev.date.split("-").map(Number);
                const evDate = new Date(y, m - 1, d);
                return (
                  <div key={ev.id} style={{
                    background: "white",
                    borderRadius: 12,
                    padding: "12px 16px",
                    marginBottom: 6,
                    border: "1px solid #f0e0ea",
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: ev.type === "birthday" ? "#fff9c4" : "#e8eaf6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, flexShrink: 0
                    }}>
                      {ev.type === "birthday" ? "🎂" : "📅"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#2d2d2d", fontFamily: "'Quicksand', sans-serif" }}>{ev.title}</div>
                      <div style={{ fontSize: 12, color: "#999", fontFamily: "'Quicksand', sans-serif" }}>
                        {evDate.getDate()} {MONTHS[evDate.getMonth()]} {ev.time ? `kl ${ev.time}` : ""}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  };

  // WEEK VIEW
  const WeekView = () => {
    const weekDates = getWeekDates(selectedDate);
    const weekNum = getWeekNumber(selectedDate);
    const hours = Array.from({ length: 18 }, (_, i) => i + 5); // 05:00 - 22:00

    return (
      <div style={{ padding: "0", paddingBottom: "80px" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)",
          padding: "14px 16px 10px",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button onClick={() => {
              const d = new Date(selectedDate);
              d.setDate(d.getDate() - 7);
              setSelectedDate(d);
            }} style={navBtnStyle}>‹</button>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#4a148c", fontFamily: "'Quicksand', sans-serif" }}>
                {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </div>
              <div style={{ fontSize: 13, color: "#e8a0bf", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>
                Vecka {weekNum}
              </div>
            </div>
            <button onClick={() => {
              const d = new Date(selectedDate);
              d.setDate(d.getDate() + 7);
              setSelectedDate(d);
            }} style={navBtnStyle}>›</button>
          </div>

          {/* View switcher */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
            {["week", "month", "year"].map(v => (
              <button key={v} onClick={() => setCalendarView(v)} style={{
                padding: "5px 14px",
                borderRadius: 20,
                border: calendarView === v ? "2px solid #e8a0bf" : "1.5px solid #f0d0e0",
                background: calendarView === v ? "#fce4ec" : "white",
                color: calendarView === v ? "#c2185b" : "#999",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Quicksand', sans-serif"
              }}>
                {v === "week" ? "Vecka" : v === "month" ? "Månad" : "År"}
              </button>
            ))}
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "44px repeat(7, 1fr)", gap: 0 }}>
            <div></div>
            {weekDates.map((d, i) => {
              const isToday = isSameDay(d, today);
              const dkk = dateKey(d.getMonth(), d.getDate());
              const isRed = RED_DAYS.has(dkk) || i >= 5;
              return (
                <div key={i} style={{
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "4px 0"
                }} onClick={() => {
                  setSelectedDate(d);
                  setCalendarView("day");
                }}>
                  <div style={{
                    fontSize: 11,
                    color: isRed ? "#e91e63" : "#888",
                    fontWeight: 600,
                    fontFamily: "'Quicksand', sans-serif"
                  }}>
                    {WEEKDAYS_SHORT[i]}
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: isToday ? "#e91e63" : "transparent",
                    color: isToday ? "white" : isRed ? "#e91e63" : "#2d2d2d",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700,
                    margin: "2px auto",
                    fontFamily: "'Quicksand', sans-serif"
                  }}>
                    {d.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time grid */}
        <div style={{ overflowY: "auto", position: "relative" }}>
          {hours.map(h => {
            const hourEvents = weekDates.map(d => {
              return getEventsForDate(d).filter(e => e.time && parseInt(e.time.split(":")[0]) === h);
            });
            return (
              <div key={h} style={{
                display: "grid",
                gridTemplateColumns: "44px repeat(7, 1fr)",
                minHeight: 52,
                borderBottom: "1px solid #f5e6ee"
              }}>
                <div style={{
                  fontSize: 11,
                  color: "#bbb",
                  textAlign: "right",
                  paddingRight: 8,
                  paddingTop: 2,
                  fontFamily: "'Quicksand', sans-serif"
                }}>
                  {String(h).padStart(2, "0")}:00
                </div>
                {weekDates.map((d, di) => {
                  const cellEvents = hourEvents[di];
                  const holiday = SWEDISH_HOLIDAYS_2026[dateKey(d.getMonth(), d.getDate())];
                  return (
                    <div key={di} style={{
                      borderLeft: "1px solid #f5e6ee",
                      padding: 2,
                      background: di >= 5 ? "#fef9fb" : "transparent",
                      position: "relative",
                      cursor: "pointer",
                      minHeight: 52
                    }} onClick={() => {
                      setSelectedDate(d);
                      setCalendarView("day");
                    }}>
                      {h === 5 && holiday && (
                        <div style={{
                          fontSize: 9,
                          background: "#f3e5f5",
                          color: "#7b1fa2",
                          padding: "1px 4px",
                          borderRadius: 4,
                          marginBottom: 2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>
                          ⭐ {holiday}
                        </div>
                      )}
                      {cellEvents.map(ev => (
                        <div key={ev.id} style={{
                          background: ev.type === "birthday" ? "#fff9c4" : "#e3f2fd",
                          borderLeft: ev.type === "birthday" ? "3px solid #ffc107" : "3px solid #42a5f5",
                          borderRadius: 4,
                          padding: "2px 4px",
                          fontSize: 10,
                          marginBottom: 1,
                          fontWeight: 600,
                          color: "#333",
                          fontFamily: "'Quicksand', sans-serif"
                        }}>
                          {ev.title}
                          <div style={{ fontSize: 9, color: "#888" }}>⏰ {ev.time}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // SPECIFIC DAY VIEW
  const SpecificDayView = () => {
    const dayEvents = getEventsForDate(selectedDate);
    const dkk = dateKey(selectedDate.getMonth(), selectedDate.getDate());
    const names = NAME_DAYS[dkk] || [];
    const holiday = SWEDISH_HOLIDAYS_2026[dkk];
    const isToday = isSameDay(selectedDate, today);

    return (
      <div style={{ padding: "16px", paddingBottom: "80px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <button onClick={() => setCalendarView("week")} style={{ ...navBtnStyle, marginRight: 12 }}>‹</button>
          <div>
            <div style={{ fontSize: 13, color: "#999", fontFamily: "'Quicksand', sans-serif" }}>
              {WEEKDAYS_FULL[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1]}
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: isToday ? "#e91e63" : "#2d2d2d", fontFamily: "'Quicksand', sans-serif" }}>
              {selectedDate.getDate()}
            </div>
            <div style={{ color: "#e8a0bf", fontWeight: 600, fontSize: 13, fontFamily: "'Quicksand', sans-serif" }}>
              {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()} · Vecka {getWeekNumber(selectedDate)}
            </div>
          </div>
        </div>

        {names.length > 0 && (
          <div style={{
            background: "linear-gradient(135deg, #f3e5f5 0%, #ede7f6 100%)",
            borderRadius: 14,
            padding: "12px 16px",
            marginBottom: 12,
            border: "1.5px solid #e1bee7"
          }}>
            <div style={{ fontSize: 12, color: "#7b1fa2", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>🎉 Namnsdag</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#4a148c", fontFamily: "'Quicksand', sans-serif" }}>{names.join(", ")}</div>
          </div>
        )}

        {holiday && (
          <div style={{
            background: "linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%)",
            borderRadius: 14,
            padding: "12px 16px",
            marginBottom: 12,
            border: "1.5px solid #ffcc80"
          }}>
            <div style={{ fontSize: 14, color: "#e65100", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>⭐ {holiday}</div>
          </div>
        )}

        <div style={{ fontWeight: 700, color: "#5d4037", fontSize: 15, marginBottom: 10, fontFamily: "'Quicksand', sans-serif" }}>
          Händelser
        </div>
        {dayEvents.length === 0 ? (
          <div style={{
            background: "#fff9f0",
            borderRadius: 14,
            padding: "24px",
            textAlign: "center",
            border: "1.5px solid #f8d7e8"
          }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>😸</div>
            <div style={{ color: "#999", fontFamily: "'Quicksand', sans-serif" }}>Inga händelser denna dag</div>
          </div>
        ) : (
          dayEvents.map(ev => (
            <div key={ev.id} style={{
              background: ev.type === "birthday" ? "#fffde7" : "#f3e5f5",
              borderRadius: 12,
              padding: "14px",
              marginBottom: 8,
              border: `1.5px solid ${ev.type === "birthday" ? "#ffe082" : "#ce93d8"}`,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <div style={{ fontSize: 22 }}>{ev.type === "birthday" ? "🎂" : "📅"}</div>
              <div>
                <div style={{ fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>{ev.title}</div>
                {ev.time && <div style={{ fontSize: 12, color: "#888", fontFamily: "'Quicksand', sans-serif" }}>kl {ev.time}</div>}
              </div>
              <button onClick={() => setEvents(prev => prev.filter(e => e.id !== ev.id))} style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                fontSize: 16,
                cursor: "pointer",
                color: "#ccc",
                padding: 4
              }}>×</button>
            </div>
          ))
        )}

        <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
          <button onClick={() => {
            const d = new Date(selectedDate);
            d.setDate(d.getDate() - 1);
            setSelectedDate(d);
          }} style={{ ...navBtnStyle, flex: 1, fontSize: 13 }}>← Föregående dag</button>
          <button onClick={() => {
            const d = new Date(selectedDate);
            d.setDate(d.getDate() + 1);
            setSelectedDate(d);
          }} style={{ ...navBtnStyle, flex: 1, fontSize: 13 }}>Nästa dag →</button>
        </div>
      </div>
    );
  };

  // MONTH VIEW
  const MonthView = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells = [];
    
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
      <div style={{ padding: "0", paddingBottom: "80px" }}>
        <div style={{
          background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)",
          padding: "14px 16px 10px",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button onClick={() => {
              const d = new Date(selectedDate);
              d.setMonth(d.getMonth() - 1);
              setSelectedDate(d);
            }} style={navBtnStyle}>‹</button>
            <div style={{
              fontSize: 22, fontWeight: 700, color: "#4a148c",
              fontFamily: "'Quicksand', sans-serif"
            }}>
              {MONTHS[month]} {year}
            </div>
            <button onClick={() => {
              const d = new Date(selectedDate);
              d.setMonth(d.getMonth() + 1);
              setSelectedDate(d);
            }} style={navBtnStyle}>›</button>
          </div>

          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 }}>
            {["week", "month", "year"].map(v => (
              <button key={v} onClick={() => setCalendarView(v)} style={{
                padding: "5px 14px",
                borderRadius: 20,
                border: calendarView === v ? "2px solid #e8a0bf" : "1.5px solid #f0d0e0",
                background: calendarView === v ? "#fce4ec" : "white",
                color: calendarView === v ? "#c2185b" : "#999",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Quicksand', sans-serif"
              }}>
                {v === "week" ? "Vecka" : v === "month" ? "Månad" : "År"}
              </button>
            ))}
          </div>

          {/* Weekday headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}>
            {WEEKDAYS_SHORT.map((d, i) => (
              <div key={d} style={{
                fontSize: 12, fontWeight: 700, padding: "4px 0",
                color: i >= 5 ? "#e91e63" : "#888",
                fontFamily: "'Quicksand', sans-serif"
              }}>{d}</div>
            ))}
          </div>
        </div>

        {/* Calendar grid */}
        <div style={{ padding: "8px 12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {cells.map((day, idx) => {
              if (!day) return <div key={`e${idx}`} />;
              const cellDate = new Date(year, month, day);
              const isToday2 = isSameDay(cellDate, today);
              const dayOfWeek = cellDate.getDay();
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;
              const dkk = dateKey(month, day);
              const isRedDay = RED_DAYS.has(dkk);
              const holiday = SWEDISH_HOLIDAYS_2026[dkk];
              const dayEvents = getEventsForDate(cellDate);

              return (
                <div key={day} style={{
                  minHeight: 72,
                  padding: "4px",
                  background: isToday2 ? "#fef0f5" : "transparent",
                  borderRadius: 10,
                  cursor: "pointer",
                  border: isToday2 ? "1.5px solid #f8bbd0" : "1px solid transparent",
                  transition: "all 0.15s"
                }} onClick={() => {
                  setSelectedDate(cellDate);
                  setCalendarView("week");
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: isToday2 ? "#e91e63" : "transparent",
                    color: isToday2 ? "white" : (isRedDay || isSunday) ? "#e91e63" : isSaturday ? "#e91e63" : "#2d2d2d",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700,
                    margin: "0 auto 2px",
                    fontFamily: "'Quicksand', sans-serif"
                  }}>
                    {day}
                  </div>
                  {holiday && (
                    <div style={{
                      fontSize: 8,
                      background: "#f3e5f5",
                      color: "#7b1fa2",
                      padding: "0 3px",
                      borderRadius: 3,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                      marginBottom: 1
                    }}>
                      ⭐ {holiday.length > 12 ? holiday.substring(0, 10) + "…" : holiday}
                    </div>
                  )}
                  {dayEvents.slice(0, 2).map(ev => (
                    <div key={ev.id} style={{
                      fontSize: 9,
                      background: ev.type === "birthday" ? "#fff9c4" : "#e3f2fd",
                      borderLeft: ev.type === "birthday" ? "2px solid #ffc107" : "2px solid #42a5f5",
                      padding: "0 3px",
                      borderRadius: 3,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: 1,
                      fontFamily: "'Quicksand', sans-serif"
                    }}>
                      {ev.time ? ev.time + " " : ""}{ev.title.length > 10 ? ev.title.substring(0, 8) + "…" : ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div style={{ fontSize: 8, color: "#999", textAlign: "center" }}>+{dayEvents.length - 2}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // YEAR VIEW
  const YearView = () => {
    const year = selectedDate.getFullYear();
    return (
      <div style={{ padding: "0", paddingBottom: "80px" }}>
        <div style={{
          background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)",
          padding: "14px 16px 10px",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button onClick={() => setSelectedDate(new Date(year - 1, selectedDate.getMonth(), 1))} style={navBtnStyle}>‹</button>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#4a148c", fontFamily: "'Quicksand', sans-serif" }}>
              {year}
            </div>
            <button onClick={() => setSelectedDate(new Date(year + 1, selectedDate.getMonth(), 1))} style={navBtnStyle}>›</button>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {["week", "month", "year"].map(v => (
              <button key={v} onClick={() => setCalendarView(v)} style={{
                padding: "5px 14px",
                borderRadius: 20,
                border: calendarView === v ? "2px solid #e8a0bf" : "1.5px solid #f0d0e0",
                background: calendarView === v ? "#fce4ec" : "white",
                color: calendarView === v ? "#c2185b" : "#999",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Quicksand', sans-serif"
              }}>
                {v === "week" ? "Vecka" : v === "month" ? "Månad" : "År"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "8px 8px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {MONTHS.map((mName, mi) => {
            const daysInM = getDaysInMonth(year, mi);
            const firstD = getFirstDayOfMonth(year, mi);
            const miniCells = [];
            for (let i = 0; i < firstD; i++) miniCells.push(null);
            for (let d = 1; d <= daysInM; d++) miniCells.push(d);

            return (
              <div key={mi} style={{
                background: "white",
                borderRadius: 14,
                padding: "10px",
                border: "1px solid #f5e6ee",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(232,160,191,0.08)"
              }} onClick={() => {
                setSelectedDate(new Date(year, mi, 1));
                setCalendarView("month");
              }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, marginBottom: 6,
                  color: "#e91e63",
                  fontFamily: "'Quicksand', sans-serif"
                }}>
                  {mName}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0, textAlign: "center" }}>
                  {["M", "T", "O", "T", "F", "L", "S"].map((d, i) => (
                    <div key={`h${i}`} style={{
                      fontSize: 8, color: i >= 5 ? "#e91e63" : "#bbb", fontWeight: 700,
                      fontFamily: "'Quicksand', sans-serif"
                    }}>{d}</div>
                  ))}
                  {miniCells.map((day, idx) => {
                    if (!day) return <div key={`e${idx}`} style={{ height: 16 }} />;
                    const cellD = new Date(year, mi, day);
                    const isT = isSameDay(cellD, today);
                    const dow = cellD.getDay();
                    const dkk = dateKey(mi, day);
                    const isRed = RED_DAYS.has(dkk) || dow === 0;
                    return (
                      <div key={day} style={{
                        height: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        fontWeight: isT ? 800 : 500,
                        color: isT ? "white" : isRed ? "#e91e63" : "#555",
                        background: isT ? "#e91e63" : "transparent",
                        borderRadius: "50%",
                        fontFamily: "'Quicksand', sans-serif"
                      }}>
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ==================== CHAT VIEW ====================
  const ChatView = () => (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 68px)",
      background: "linear-gradient(180deg, #fef9f0 0%, #fef5f9 100%)"
    }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 12px" }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            display: "flex",
            justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
            marginBottom: 10
          }}>
            {msg.from === "cat" && (
              <div style={{ marginRight: 6, marginTop: 4, flexShrink: 0 }}>
                <CatIcon size={28} />
              </div>
            )}
            <div style={{
              maxWidth: "78%",
              background: msg.from === "user"
                ? "linear-gradient(135deg, #f8bbd0 0%, #e8a0bf 100%)"
                : "white",
              color: msg.from === "user" ? "white" : "#2d2d2d",
              borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "10px 14px",
              fontSize: 14,
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              border: msg.from === "cat" ? "1px solid #f8d7e8" : "none",
              fontFamily: "'Quicksand', sans-serif"
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 12px",
        background: "white",
        borderTop: "1px solid #f5e6ee",
        display: "flex",
        gap: 8,
        alignItems: "flex-end"
      }}>
        <input
          ref={inputRef}
          type="text"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Skriv ett möte, födelsedag eller anteckning.."
          style={{
            flex: 1,
            border: "1.5px solid #f0d0e0",
            borderRadius: 24,
            padding: "10px 16px",
            fontSize: 14,
            outline: "none",
            background: "#fef9f5",
            color: "#2d2d2d",
            fontFamily: "'Quicksand', sans-serif"
          }}
        />
        <button onClick={handleSend} style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "none",
          background: chatInput.trim() ? "linear-gradient(135deg, #f8bbd0 0%, #e8a0bf 100%)" : "#f5e6ee",
          cursor: chatInput.trim() ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          color: "white",
          flexShrink: 0,
          transition: "all 0.2s"
        }}>
          ➤
        </button>
      </div>
    </div>
  );

  // ==================== NOTES VIEW ====================
  const NotesView = () => (
    <div style={{ padding: "16px", paddingBottom: "80px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16
      }}>
        <span style={{ fontSize: 22 }}>📝</span>
        <span style={{
          fontSize: 22, fontWeight: 700, color: "#2d2d2d",
          fontFamily: "'Quicksand', sans-serif"
        }}>Anteckningar</span>
        <span style={{
          marginLeft: "auto",
          fontSize: 13,
          color: "#999",
          fontFamily: "'Quicksand', sans-serif"
        }}>{notes.length} st</span>
      </div>

      {notes.length === 0 ? (
        <div style={{
          background: "linear-gradient(135deg, #fff9f0 0%, #fef6f0 100%)",
          borderRadius: 16,
          padding: "40px 20px",
          textAlign: "center",
          border: "1.5px solid #f8d7e8"
        }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🐱</div>
          <div style={{ color: "#999", fontSize: 15, fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>
            Inga anteckningar ännu!
          </div>
          <div style={{ color: "#ccc", fontSize: 13, marginTop: 4, fontFamily: "'Quicksand', sans-serif" }}>
            Skriv "Anteckning: ..." i chatten
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notes.map(note => (
            <div key={note.id} style={{
              background: "white",
              borderRadius: 14,
              padding: "14px 16px",
              border: "1.5px solid #f8d7e8",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              boxShadow: "0 1px 4px rgba(232,160,191,0.06)"
            }}>
              <div style={{ fontSize: 16, marginTop: 2 }}>📌</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14,
                  color: "#2d2d2d",
                  fontFamily: "'Quicksand', sans-serif",
                  lineHeight: 1.5
                }}>{note.text}</div>
                <div style={{
                  fontSize: 11,
                  color: "#ccc",
                  marginTop: 4,
                  fontFamily: "'Quicksand', sans-serif"
                }}>
                  {new Date(note.date).toLocaleDateString("sv-SE")}
                </div>
              </div>
              <button onClick={() => setNotes(prev => prev.filter(n => n.id !== note.id))} style={{
                background: "none",
                border: "none",
                fontSize: 16,
                cursor: "pointer",
                color: "#ddd",
                padding: 4
              }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ==================== STYLES ====================
  const navBtnStyle = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1.5px solid #f0d0e0",
    background: "white",
    color: "#e8a0bf",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  // ==================== RENDER ====================
  const renderContent = () => {
    if (activeTab === "chat") return <ChatView />;
    if (activeTab === "notes") return <NotesView />;
    
    // Calendar tab
    if (calendarView === "week") return <WeekView />;
    if (calendarView === "month") return <MonthView />;
    if (calendarView === "year") return <YearView />;
    if (calendarView === "day") return <SpecificDayView />;
    return <DayDashboard />;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; padding: 0; background: #fef9f5; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #f0d0e0; border-radius: 4px; }
        input::placeholder { color: #ccc; }
      `}</style>
      <div style={{
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fef9f0 0%, #fef5f9 50%, #fef9f0 100%)",
        position: "relative",
        fontFamily: "'Quicksand', sans-serif",
        overflow: "hidden"
      }}>
        {/* Main content */}
        <div style={{
          height: "calc(100vh - 68px)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch"
        }}>
          {renderContent()}
        </div>

        {/* Bottom nav */}
        <div style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          height: 68,
          background: "white",
          borderTop: "1px solid #f5e6ee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 20px",
          zIndex: 100
        }}>
          {[
            { id: "calendar", icon: "📅", label: "Kalender" },
            { id: "chat", icon: "💬", label: "Chatt" },
            { id: "notes", icon: "📋", label: "Anteckningar" }
          ].map(tab => (
            <button key={tab.id} onClick={() => {
              setActiveTab(tab.id);
              if (tab.id === "calendar") setCalendarView(null);
            }} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              background: "none",
              border: activeTab === tab.id ? "2px solid #e8a0bf" : "2px solid transparent",
              borderRadius: 14,
              padding: "6px 18px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}>
              <span style={{ fontSize: 20 }}>{tab.icon}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: activeTab === tab.id ? "#e8a0bf" : "#bbb",
                fontFamily: "'Quicksand', sans-serif"
              }}>{tab.label}</span>
              {activeTab === tab.id && (
                <div style={{
                  width: 20,
                  height: 3,
                  borderRadius: 2,
                  background: "#f8bbd0",
                  marginTop: -2
                }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
