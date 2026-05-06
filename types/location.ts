export type Location = {
    location_pk: number,
    location_name: string,
    location_address: string,
    location_address_number: number,
    location_postal_code: number,
    location_city: string,
    location_washrooms: number;
    location_self_washing: number,
    location_operation_status: number,
    location_operation_status_message: string,
    latitude: number,
    longitude: number,
    busyness_status: 'Ikke travlt nu' | 'Lidt travlt nu' | 'Meget travlt nu'
}