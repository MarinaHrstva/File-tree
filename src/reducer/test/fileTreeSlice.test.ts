import reducer, {
  initialState,
  resetInitialState,
  resetSelectedFile,
  setCurrentPrefix,
} from "../fileTreeSlice";
import { fileTreeStateType } from "../types";

const NEW_STATE_MOCK = {
  fileTree: [],
  activeFolderContent: [],
  currentPrefix: "test/test/test",
  selectedFile: { fileName: "test/test/test" },
  loading: false,
  error: "test/test/test error",
};

describe("fileTreeSlice reducer", () => {
  const initialFileTreeState = initialState;

  it("tests setCurrentPrefix", () => {
    const actual = reducer(
      initialFileTreeState,
      setCurrentPrefix("test/test/test")
    );
    expect(actual.currentPrefix).toEqual("test/test/test");
  });

  it("tests resetInitialState", () => {
    const newState = reducer(
      NEW_STATE_MOCK as fileTreeStateType,
      resetInitialState()
    );
    expect(newState).toEqual(initialFileTreeState);
  });

  it("tests resetSelectedFile", () => {
    const newState = reducer(
      NEW_STATE_MOCK as fileTreeStateType,
      resetSelectedFile()
    );
    expect(newState.selectedFile).toEqual(null);
  });
});
