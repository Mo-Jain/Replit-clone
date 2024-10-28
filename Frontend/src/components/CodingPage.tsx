import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Socket, io } from 'socket.io-client';
import styled from '@emotion/styled';
import Editor from "./Editor";

function useSocket(replId: string) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(`ws://${replId}.peetcode.com`);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [replId]);

    return socket;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Aligns children (button) to the right */
  padding: 10px; /* Adds some space around the button */
`;

const Workspace = styled.div`
  display: flex;
  margin: 0;
  font-size: 16px;
  width: 100%;
`;

const LeftPanel = styled.div`
  flex: 1;
  width: 60%;
`;

const RightPanel = styled.div`
  flex: 1;
  width: 40%;
`;


export const CodingPage = () => {
    const [podCreated, setPodCreated] = useState(false);
    

    if (!podCreated) {
        return <>Booting...</>
    }
    return <CodingPagePostPodCreation />
}

export const CodingPagePostPodCreation = () => {
    const [searchParams] = useSearchParams();
    const replId = searchParams.get('replId') ?? '';
    const [loaded, setLoaded] = useState(false);
    const socket = useSocket(replId);
    const [fileStructure, setFileStructure] = useState<any>([]);


    useEffect(() => {
        if (socket) {
            socket.on('loaded', ({ rootContent }: { rootContent: any}) => {
                setLoaded(true);
                setFileStructure(rootContent);
            });
        }
    }, [socket]);
    
    return <>
             <Container>
             <ButtonContainer>
                <button >See output</button>
            </ButtonContainer>
            <Workspace>
                <LeftPanel>
                    <Editor socket={socket} />
                </LeftPanel>
                <RightPanel>
                    <Terminal />
                </RightPanel>
            </Workspace>
        </Container>
    </>

}
