import {Rating} from './rating.model';

export interface Course {
    courseid: string;
    name: string;
    ects: number;
    image: string;
    description: string;
    semester: number;
    formOfCourse: string;
    maxStudents: number;
    grade: number;
    votes: number;
    ratings: Array<Rating>;
}
