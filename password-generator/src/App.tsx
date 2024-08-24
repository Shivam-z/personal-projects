import "./App.css";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Slider,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useEffect, useState } from "react";
import { generatePassword } from "./helper";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OuterStack = styled(Stack)({
  backgroundColor: "lightblue",
  padding: "50px",
  height: "60vh",
  width: "50vw",
  margin: "auto",
  borderRadius: "20px",
  gap: "20px",
});

const HeaderStack = styled(Stack)({
  backgroundColor: "#076cbd",
  padding: "20px",
  borderRadius: "10px",
  height: "10vh",
  color: "black",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
});

const ContentStack = styled(Stack)({
  backgroundColor: "lightyellow",
  padding: "10px",
  borderRadius: "10px",
  height: "50vh",
  color: "black",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
});

const StyledButton = styled(Button)({
  padding: "10px",
  borderRadius: "10px",
  display: "flex",
});

const StyledTypography = styled(Typography)({
  color: "black",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "36px",
  fontFamily: "Source Sans 3",
  fontWeight: "lighter",
});

const PasswordBox = styled(Box)({
  backgroundColor: "white",
  width: "80%",
  padding: "10px",
  borderRadius: "10px",
  color: "black",
  fontSize: "24px",
  fontFamily: "sans-serif",
  fontWeight: "lighter",
  height: "50%",
});

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState<number>(10);
  const [isChecked, setIsChecked] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const handleGeneratePassword = () => {
    const password = generatePassword(passwordLength, isChecked);
    setPassword(password);
  };

  const handlePasswordCopy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handlePasswordRefresh = () => {
    setPassword("");
    setPassword(generatePassword(passwordLength, isChecked));
  };

  useEffect(() => {
    // debounce(handleGeneratePassword, 1000)();
    handleGeneratePassword();
  }, [passwordLength, isChecked]);
  return (
    <OuterStack>
      <HeaderStack>
        <PasswordBox>{password}</PasswordBox>
        <Stack direction="row" gap="20px">
          <div>
            <ContentCopyIcon
              sx={{ cursor: "pointer" }}
              onClick={handlePasswordCopy}
            />
            <ToastContainer />
          </div>
          <RefreshIcon
            sx={{ cursor: "pointer" }}
            onClick={handlePasswordRefresh}
          />
        </Stack>
      </HeaderStack>
      <ContentStack>
        <StyledTypography variant="h4">
          Customize your password
        </StyledTypography>
        <Divider />
        <Stack justifyContent="space-between" direction="row" padding="50px">
          <Stack alignItems="center">
            <Stack direction="row" gap="50px" alignItems="center">
              <TextField
                type="number"
                sx={{
                  width: "4vw",
                }}
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                InputProps={{ inputProps: { min: 1, max: 50 } }}
              />
              <Slider
                min={1}
                max={50}
                sx={{
                  width: "20vw",
                }}
                value={passwordLength}
                onChange={(_, value) => {
                  setPasswordLength(value as number);
                }}
              />
            </Stack>
          </Stack>
          <Stack>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Uppercase"
                checked={isChecked.uppercase}
                onChange={(_, checked) => {
                  if (
                    !isChecked.lowercase &&
                    !isChecked.numbers &&
                    !isChecked.symbols
                  )
                    return;
                  else setIsChecked({ ...isChecked, uppercase: checked });
                }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Lowercase"
                checked={isChecked.lowercase}
                onChange={(_, checked) => {
                  if (
                    !isChecked.uppercase &&
                    !isChecked.numbers &&
                    !isChecked.symbols
                  )
                    return;
                  else setIsChecked({ ...isChecked, lowercase: checked });
                }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Numbers"
                checked={isChecked.numbers}
                onChange={(_, checked) => {
                  if (
                    !isChecked.uppercase &&
                    !isChecked.lowercase &&
                    !isChecked.symbols
                  )
                    return;
                  else setIsChecked({ ...isChecked, numbers: checked });
                }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Symbols"
                checked={isChecked.symbols}
                onChange={(_, checked) => {
                  if (
                    !isChecked.uppercase &&
                    !isChecked.lowercase &&
                    !isChecked.numbers
                  )
                    return;
                  else setIsChecked({ ...isChecked, symbols: checked });
                }}
              />
            </FormGroup>
          </Stack>
        </Stack>
        <StyledButton variant="contained" onClick={handleGeneratePassword}>
          <Typography variant="h6" fontFamily="sans-serif" fontSize={"20px"}>
            Generate
          </Typography>
        </StyledButton>
      </ContentStack>
    </OuterStack>
  );
}

export default App;
