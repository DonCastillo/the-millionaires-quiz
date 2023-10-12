import { CategoryName } from "$lib/constants/category.constants";

const stringToCategoryName = (str: string): CategoryName => {
    switch(str) {
        case 'General Knowledge': return CategoryName.GENERAL_KNOWLEDGE;
        case 'Entertainment: Books': return CategoryName.BOOKS;
        case 'Entertainment: Film': return CategoryName.FILM;
        case 'Entertainment: Music': return CategoryName.MUSIC;
        case 'Entertainment: Musicals & Theatres': return CategoryName.MUSICALS_THEATRES;
        case 'Entertainment: Television': return CategoryName.TELEVISION;
        case 'Entertainment: Video Games': return CategoryName.VIDEO_GAMES;
        case 'Entertainment: Board Games': return CategoryName.BOARD_GAMES;
        case 'Science & Nature': return CategoryName.SCIENCE_NATURE;
        case 'Science: Computers': return CategoryName.COMPUTERS;
        case 'Science: Mathematics': return CategoryName.MATHEMATICS;
        case 'Mythology': return CategoryName.MYTHOLOGY;
        case 'Sports': return CategoryName.SPORTS;
        case 'Geography': return CategoryName.GEOGRAPHY;
        case 'History': return CategoryName.HISTORY;
        case 'Politics': return CategoryName.POLITICS;
        case 'Art': return CategoryName.ART;
        case 'Celebrities': return CategoryName.CELEBRITIES;
        case 'Animals': return CategoryName.ANIMALS;
        case 'Vehicles': return CategoryName.VEHICLES;
        case 'Entertainment: Comics': return CategoryName.COMICS;
        case 'Science: Gadgets': return CategoryName.GADGETS;
        case 'Entertainment: Japanese Anime & Manga': return CategoryName.ANIME_MANGA;
        case 'Entertainment: Cartoon & Animations': return CategoryName.CARTOON_ANIMATIONS;
        default: return CategoryName.GENERAL_KNOWLEDGE;
    }
}

const getCategoryIcon = (categoryName: CategoryName): string => {
    switch(categoryName) {
        case CategoryName.GENERAL_KNOWLEDGE: return "fa-brain";
        case CategoryName.BOOKS: return "fa-book";
        case CategoryName.FILM: return "fa-film";
        case CategoryName.MUSIC: return "fa-music";
        case CategoryName.MUSICALS_THEATRES: return "fa-masks-theater";
        case CategoryName.TELEVISION: return "fa-tv";
        case CategoryName.VIDEO_GAMES: return "fa-gamepad";
        case CategoryName.BOARD_GAMES: return "fa-dice";
        case CategoryName.SCIENCE_NATURE: return "fa-atoms";
        case CategoryName.COMPUTERS: return "fa-laptop-code";
        case CategoryName.MATHEMATICS: return "fa-calculator";
        case CategoryName.MYTHOLOGY: return "fa-dragon";
        case CategoryName.SPORTS: return "fa-football";
        case CategoryName.GEOGRAPHY: return "fa-earth-americas";
        case CategoryName.HISTORY: return "fa-monument";
        case CategoryName.POLITICS: return "fa-landmark";
        case CategoryName.ART: return "fa-palette";
        case CategoryName.CELEBRITIES: return "fa-star";
        case CategoryName.ANIMALS: return "fa-paw";
        case CategoryName.VEHICLES: return "fa-car";
        case CategoryName.COMICS: return "fa-user-ninja";
        case CategoryName.GADGETS: return "fa-mobile-screen";
        case CategoryName.ANIME_MANGA: return "fa-user-ninja";
        case CategoryName.CARTOON_ANIMATIONS: return "fa-user-ninja";
        default: return "fa-brain";
    }
}
export {stringToCategoryName, getCategoryIcon};