interface Book{
    title : number;
    author : string;
    enre : string;
    rating : number; 
    total_copies : number; 
    available_copies : number; 
    description : string;
    color : string;
    cover : string;
    video : string;
    summary : string;
    isLoanedBook? : boolean;
}

interface AuthCrendentials {
    fullName: string;
    email: string;
    password: string;
    universityId: number;
    universityCard: string;
}