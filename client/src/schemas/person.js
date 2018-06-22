
import { schema } from 'normalizr';

const person = new schema.Entity('person');

const character = new schema.Entity('character', {}, {
  processStrategy: (value, parent) => {
    return { ...value, person: parent.person.id };
  }
});

const castMember = { person, character };

export const castSchema = [ castMember ];
