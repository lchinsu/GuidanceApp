export interface Patient {
    PatientID: number; 
    PatientName: string;
    DateOfBirth: Date;
    GenderId: number;
    GenderName: string;
    City: string;
    PostalCode: number;
    WardId: number;
    WardName: string;
    Bed: string;
    HospitalDeptUnitId: number;
    HospitalDeptUnitName: string;
    AdmissionDate: Date;
    DischargedDate: Date;
    DoctorId: number;
    DoctorName: string;
}