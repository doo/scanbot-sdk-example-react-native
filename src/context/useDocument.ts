import {createContext, useCallback, useState} from 'react';
import ScanbotSDK, {DocumentData} from 'react-native-scanbot-sdk';

interface DocumentContext {
  document?: DocumentData;
  setDocument: (document: DocumentData) => void;
  loadDocument: (documentID: string) => void;
}

export const DocumentContext = createContext<DocumentContext>({
  document: undefined,
  setDocument: (_document: DocumentData) => {},
  loadDocument: (_documentID: string) => {},
});

export function useDocument() {
  const [document, setDocumentData] = useState<DocumentData | undefined>(
    undefined,
  );

  const setDocument = useCallback((_document: DocumentData) => {
    setDocumentData(_document);
  }, []);

  const loadDocument = useCallback(async (documentID: string) => {
    try {
      let documentResult = await ScanbotSDK.Document.loadDocument(documentID);
      setDocumentData(documentResult);
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  return {document, setDocument, loadDocument};
}
