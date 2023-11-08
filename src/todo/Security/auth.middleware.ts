import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomRequest} from '../Security/request_extension';

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['auth-user'] as string;

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    //on vérifie la validité du token JWT en utilisant la méthode verify
    //on decode le token en utilisant le clé secret shhhhhh
    //as { userId: string } : l'objet retourné par verify doit avoir une propriété userId de type string
    const decodedToken = verify(token, 'shhhhhh') as { userId: string };
    if (!decodedToken.userId) {
      return res.status(403).json({ message: 'Accès refusé. Le token ne contient pas de userId.' });
    }
    req.userId= decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
  }
};
