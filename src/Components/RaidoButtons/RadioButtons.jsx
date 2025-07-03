import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
// eslint-disable-next-line react/prop-types
export default function RadioButtonsGroup({
  question,
  values,
  index,
  handleChange,
  selectedAnswer,
  isFinished,
  correctAnswer,
}) {
  return (
    <FormControl>
      <FormLabel
        id="demo-radio-buttons-group-label"
        className="dark:!text-white !text-black"
        sx={`{ fontSize: "1.4rem" }`}>
        {index + 1} - {question}
      </FormLabel>
      <RadioGroup
        onChange={handleChange}
        selectedAnswer={selectedAnswer ? selectedAnswer : ""}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group">
        {values.map((el, idx) => (
          <Stack key={idx} direction={"row"} justifyContent={"space-between"}>
            <FormControlLabel
            
              value={el.text}
              control={
                <Radio
                  disabled={isFinished}
                  sx={{
                    color: "gray",
                    "&.Mui-disabled": {
                      color: "lightgray", // ✅ اللون عند التعطيل (مخصص)
                    },
                  }}
                 
                />
              }
              label={el.text}
              sx={{my:1,
                "& .MuiFormControlLabel-label.Mui-disabled": {
                  color: "gray", // ✅ لون النص المعطل (الـ label text)
                },
              }}
            />
            {isFinished ? (
               correctAnswer  === el.text ? (
                <CheckCircleIcon sx={{ color: "green" }} />
              ) : (
                <CancelIcon sx={{ color: "red" }} />
              )
            ) : (
              ""
            )}
          </Stack>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
