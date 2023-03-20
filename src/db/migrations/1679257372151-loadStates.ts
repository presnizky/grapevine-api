import { MigrationInterface, QueryRunner } from "typeorm"
import {Country, State} from '@models';

export class loadStates1679257372151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            const countries = ['United States', 'Canada', 'Argentina'];

            const stateData = [
            {
                country: 'United States',
                states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
            },
            {
                country: 'Canada',
                states: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
            },
            {
                country: 'Argentina',
                states: ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
            },
            ];

            for (const data of stateData) {
                const country = await queryRunner.manager.findOneOrFail(Country, { where: {name: data.country} });
          
                const states = data.states.map((stateName) => {
                  const state = new State();
                  state.name = stateName;
                  state.country = country;
                  return state;
                });
          
                await queryRunner.manager.save(states);
              }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
