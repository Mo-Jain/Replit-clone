import styled from "@emotion/styled";
import { Code } from "./external/editor/code";
import Sidebar from "./external/components/sidebar";
import { Socket } from "socket.io-client";

// credits - https://codesandbox.io/s/monaco-tree-pec7u
export const Editor = ({
    socket
}: {
    socket: Socket;
}) => {
  

  return (
    <div>
      <Main>
        <Sidebar>
          <FileTree
          />
        </Sidebar>
        <Code socket={socket} />
      </Main>
    </div>
  );
};

const Main = styled.main`
  display: flex;
`;