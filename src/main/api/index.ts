import { PersonController } from "../../application/controllers/person.js";
const p = new PersonController();
console.log(p.speak("rodrigo"));
p.speak();
