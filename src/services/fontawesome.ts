import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight, faArrowRotateRight, faArrowUp, faCircleCheck, faCirclePlay, faClock, faEnvelope, faLock, faPhone, faThumbtack, faTicket, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const icons: Record<string, IconDefinition> = {
    faInstagram, faCircleCheck, faThumbtack, faClock, faLock, faUserGroup, faTicket, faCirclePlay,
    faWhatsapp, faAngleRight, faArrowUp, faEnvelope, faPhone, faEye, faEyeSlash, faArrowRotateRight
};
export default icons;