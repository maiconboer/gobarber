import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // sem passar parametro - default varchar
    provider: string;

    @Column('time without time zone')
    date: Date;
}

export default Appointment;
