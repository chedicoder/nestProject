export const validationMessages = {
    required: 'Ce champ est obligatoire',
    minLength: (length: number) => `Ce champ doit comporter au moins ${length} caractères`,
    maxLength: (length: number) => `Ce champ ne peut pas dépasser ${length} caractères`,
    isString: 'Ce champ doit être une chaîne de caractères',
  };
  