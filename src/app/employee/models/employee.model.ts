export class Employee {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    telephone?: string | undefined;
    position: string | undefined;
    startWorkDate?: Date | undefined;
    shortDescription: string | undefined;
    salaryPerHour: number | undefined;
    active: boolean | undefined;
    picture?: string = 'no-picture.png';
    avatarUrl?: string;

    //picture, cv description, position, 
}