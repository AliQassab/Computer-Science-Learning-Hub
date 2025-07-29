// Global variables
let challengeNumber = 42;
let instructionStep = 0;

// Navigation function
function showSection(sectionId, event) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Update navigation buttons
  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  // Check if event is defined before accessing event.target
  if (event && event.target) {
    event.target.classList.add("active");
  } else {
    // Fallback for initial load or direct call without event
    const initialButton = document.querySelector(
      `.nav-btn[onclick*="${sectionId}"]`
    );
    if (initialButton) {
      initialButton.classList.add("active");
    }
  }
}

// Number conversion functions
function setupNumberConverter() {
  const decimalInput = document.getElementById("decimal");
  const binaryInput = document.getElementById("binary");
  const hexInput = document.getElementById("hex");

  if (decimalInput) {
    decimalInput.addEventListener("input", function () {
      const value = this.value.trim(); // Trim whitespace
      if (value === "") {
        // Clear other fields if input is empty
        if (binaryInput) binaryInput.value = "";
        if (hexInput) hexInput.value = "";
        updateConversionResult(null); // Clear result div
        return;
      }
      if (!isNaN(value) && value !== "") {
        const num = parseInt(value);
        if (!isNaN(num)) {
          if (binaryInput) binaryInput.value = num.toString(2);
          if (hexInput) hexInput.value = num.toString(16).toUpperCase();
          updateConversionResult(num);
        } else {
          updateConversionResult("Invalid Decimal Input");
        }
      } else {
        updateConversionResult("Invalid Decimal Input");
      }
    });
  }

  if (binaryInput) {
    binaryInput.addEventListener("input", function () {
      const value = this.value.trim();
      if (value === "") {
        if (decimalInput) decimalInput.value = "";
        if (hexInput) hexInput.value = "";
        updateConversionResult(null);
        return;
      }
      if (/^[01]+$/.test(value)) {
        const num = parseInt(value, 2);
        if (!isNaN(num)) {
          if (decimalInput) decimalInput.value = num;
          if (hexInput) hexInput.value = num.toString(16).toUpperCase();
          updateConversionResult(num);
        } else {
          updateConversionResult("Invalid Binary Input");
        }
      } else {
        updateConversionResult("Invalid Binary Input");
      }
    });
  }

  if (hexInput) {
    hexInput.addEventListener("input", function () {
      const value = this.value.trim();
      if (value === "") {
        if (decimalInput) decimalInput.value = "";
        if (binaryInput) binaryInput.value = "";
        updateConversionResult(null);
        return;
      }
      if (/^[0-9A-Fa-f]+$/.test(value)) {
        const num = parseInt(value, 16);
        if (!isNaN(num)) {
          if (decimalInput) decimalInput.value = num;
          if (binaryInput) binaryInput.value = num.toString(2);
          updateConversionResult(num);
        } else {
          updateConversionResult("Invalid Hexadecimal Input");
        }
      } else {
        updateConversionResult("Invalid Hexadecimal Input");
      }
    });
  }
}

function updateConversionResult(num) {
  const resultDiv = document.getElementById("conversion-result");
  if (resultDiv) {
    if (num === null) {
      resultDiv.innerHTML = `
                        Enter any number in any base to see conversions!
                    `;
      resultDiv.style.borderColor = "#3498db"; // Reset border
    } else if (typeof num === "string") {
      resultDiv.innerHTML = `
                        <p style="color: red; font-weight: bold;">${num}</p>
                    `;
      resultDiv.style.borderColor = "red"; // Indicate error
    } else {
      resultDiv.innerHTML = `
                        <h4>Converting ${num}:</h4>
                        <p><strong>Decimal:</strong> ${num}</p>
                        <p><strong>Binary:</strong> ${num.toString(2)}</p>
                        <p><strong>Hexadecimal:</strong> ${num
                          .toString(16)
                          .toUpperCase()}</p>
                    `;
      resultDiv.style.borderColor = "#3498db"; // Reset border
    }
  }
}

// Bitwise operations
function setupBitwiseOperations() {
  const bitA = document.getElementById("bit-a");
  const bitB = document.getElementById("bit-b");
  const resultDiv = document.getElementById("bitwise-result");

  function updateBitwise() {
    const a = bitA.value.trim();
    const b = bitB.value.trim();

    if (a === "" || b === "") {
      resultDiv.innerHTML = `
                        Results will appear here...
                    `;
      resultDiv.style.borderColor = "#3498db";
      return;
    }

    if (/^[01]+$/.test(a) && /^[01]+$/.test(b)) {
      const numA = parseInt(a, 2);
      const numB = parseInt(b, 2);

      // Pad shorter binary string with leading zeros to match length
      const maxLength = Math.max(a.length, b.length);
      const paddedA = a.padStart(maxLength, "0");
      const paddedB = b.padStart(maxLength, "0");

      resultDiv.innerHTML = `
                        <h4>Bitwise Operations:</h4>
                        <p><strong>AND:</strong> ${paddedA} & ${paddedB} = ${(
        numA & numB
      )
        .toString(2)
        .padStart(maxLength, "0")}</p>
                        <p><strong>OR:</strong> ${paddedA} | ${paddedB} = ${(
        numA | numB
      )
        .toString(2)
        .padStart(maxLength, "0")}</p>
                        <p><strong>XOR:</strong> ${paddedA} ^ ${paddedB} = ${(
        numA ^ numB
      )
        .toString(2)
        .padStart(maxLength, "0")}</p>
                        <p><strong>NOT A:</strong> ~${paddedA} = ${
        (~numA >>> 0).toString(2).slice(-maxLength) // Unsigned right shift to handle negative in JS
      }</p>
                    `;
      resultDiv.style.borderColor = "#3498db";
    } else {
      resultDiv.innerHTML = `
                        <p style="color: red; font-weight: bold;">Invalid Binary Input for Bitwise Operations.</p>
                    `;
      resultDiv.style.borderColor = "red";
    }
  }

  if (bitA) bitA.addEventListener("input", updateBitwise);
  if (bitB) bitB.addEventListener("input", updateBitwise);

  // Initial calculation
  updateBitwise();
}

// Challenge functions
function newChallenge() {
  challengeNumber = Math.floor(Math.random() * 255) + 1; // Numbers from 1 to 255
  const challengeSpan = document.getElementById("challenge-num");
  const answerDiv = document.getElementById("challenge-answer");

  if (challengeSpan) challengeSpan.textContent = challengeNumber;
  if (answerDiv) {
    answerDiv.style.display = "none";
    answerDiv.style.borderColor = "#3498db"; // Reset border
  }
}

function showAnswer() {
  const answerDiv = document.getElementById("challenge-answer");
  if (answerDiv) {
    const binary = challengeNumber.toString(2);
    const hex = challengeNumber.toString(16).toUpperCase();

    answerDiv.innerHTML = `
                    <h4>Answer for ${challengeNumber}:</h4>
                    <p><strong>Binary:</strong> ${binary}</p>
                    <p><strong>Hexadecimal:</strong> ${hex}</p>
                `;
    answerDiv.style.display = "block";
    answerDiv.style.borderColor = "#2ecc71"; // Green border for answer
  }
}

// CPU component explanations
function explainComponent(component) {
  const infoDiv = document.getElementById("component-info");
  const explanations = {
    alu: "The <strong>Arithmetic Logic Unit (ALU)</strong> is a digital circuit within the CPU that performs arithmetic and bitwise logical operations on integer binary numbers. It's the computational powerhouse.",
    cu: "The <strong>Control Unit (CU)</strong> is a component of the CPU that directs the operation of the processor. It tells the computer's memory, arithmetic/logic unit, and input and output devices how to respond to a program's instructions.",
    registers:
      "<strong>Registers</strong> are small, very fast storage locations within the CPU itself. They hold data that the CPU is currently processing or will process very soon, providing the quickest possible access to data.",
    cache:
      "<strong>Cache memory</strong> is a high-speed static random-access memory (SRAM) that a computer microprocessor can access more quickly than it can access regular random-access memory (RAM). It stores frequently used program instructions and data.",
  };

  if (infoDiv) {
    infoDiv.innerHTML = `<h4>${component.toUpperCase()}</h4><p>${
      explanations[component]
    }</p>`;
    infoDiv.style.display = "block";
    infoDiv.style.borderColor = "#3498db";
  }
}

// Instruction simulator
function simulateInstruction() {
  const steps = [
    '<strong>Step 1: FETCH</strong> - The CPU retrieves the instruction "LOAD R1, #42" from memory.',
    "<strong>Step 2: DECODE</strong> - The Control Unit interprets the instruction, understanding it means to load the value 42 into Register R1.",
    "<strong>Step 3: EXECUTE</strong> - The value 42 is stored in Register R1. (R1 = 42)",
    '<strong>Step 4: FETCH</strong> - The CPU retrieves the next instruction "ADD R1, #8" from memory.',
    "<strong>Step 5: DECODE</strong> - The Control Unit interprets this as an instruction to add 8 to the current value in R1.",
    "<strong>Step 6: EXECUTE</strong> - The ALU performs the addition (42 + 8 = 50), and the result (50) is stored back in Register R1. (R1 = 50)",
    '<strong>Step 7: FETCH</strong> - The CPU retrieves the final instruction "STORE R1, MEM" from memory.',
    "<strong>Step 8: DECODE</strong> - The Control Unit understands this means to save the value from R1 to a specific memory location.",
    "<strong>Step 9: EXECUTE</strong> - The value 50 from Register R1 is written to the designated memory address.",
    "<strong>Step 10: COMPLETE!</strong> All instructions executed successfully. The program has finished its task.",
  ];

  const infoDiv = document.getElementById("instruction-info");
  const progressContainer = document.getElementById("progress-container");
  const progressBar = document.getElementById("progress-bar");

  // Reset if all steps are done
  if (instructionStep >= steps.length) {
    instructionStep = 0;
    if (progressBar) progressBar.style.width = "0%"; // Reset progress bar visually
  }

  if (infoDiv) {
    infoDiv.innerHTML = `<p>${steps[instructionStep]}</p>`;
    infoDiv.style.display = "block";
    infoDiv.style.borderColor = "#3498db";
  }

  if (progressContainer && progressBar) {
    progressContainer.style.display = "block";
    const percent = ((instructionStep + 1) / steps.length) * 100;
    progressBar.style.width = percent + "%";
  }

  instructionStep++;
}

// System call demo
function showSyscall() {
  const syscalls = [
    {
      call: '<code>open("/file.txt", O_RDONLY)</code>',
      desc: "Opens a file or device for reading.",
      result: "Returns a file descriptor (e.g., <code>3</code>) if successful.",
    },
    {
      call: "<code>read(fd, buffer, count)</code>",
      desc: "Reads <code>count</code> bytes from the file descriptor <code>fd</code> into <code>buffer</code>.",
      result: "Returns the number of bytes read (e.g., <code>847</code>).",
    },
    {
      call: "<code>write(fd, buffer, count)</code>",
      desc: "Writes <code>count</code> bytes from <code>buffer</code> to the file descriptor <code>fd</code>.",
      result: "Returns the number of bytes written (e.g., <code>5</code>).",
    },
    {
      call: "<code>close(fd)</code>",
      desc: "Closes the file descriptor <code>fd</code>, releasing its resources.",
      result: "Returns <code>0</code> on success.",
    },
    {
      call: "<code>fork()</code>",
      desc: "Creates a new process by duplicating the calling process. The new process (child) is an exact copy of the calling process (parent).",
      result:
        "Returns <code>0</code> to the child process and the child's PID to the parent process.",
    },
    {
      call: "<code>execve(path, argv, envp)</code>",
      desc: "Replaces the current process image with a new process image specified by <code>path</code>.",
      result: "Does not return on success; on error, returns <code>-1</code>.",
    },
    {
      call: "<code>exit(status)</code>",
      desc: "Terminates the calling process with the specified <code>status</code>.",
      result: "Does not return.",
    },
  ];

  const syscall = syscalls[Math.floor(Math.random() * syscalls.length)];
  const infoDiv = document.getElementById("syscall-info");

  if (infoDiv) {
    infoDiv.innerHTML = `
                    <h4>System Call Demo</h4>
                    <p><strong>Call:</strong> ${syscall.call}</p>
                    <p><strong>Description:</strong> ${syscall.desc}</p>
                    <p><strong>Result:</strong> ${syscall.result}</p>
                `;
    infoDiv.style.display = "block";
    infoDiv.style.borderColor = "#3498db";
  }
}

// Pipeline explanation
function explainPipeline() {
  const infoDiv = document.getElementById("pipeline-info");
  if (infoDiv) {
    infoDiv.innerHTML = `
                    <h4>Pipeline Breakdown:</h4>
                    <ol style="margin-left: 1.5rem;">
                        <li><strong><code>cat book.txt</code></strong>: Reads the entire content of 'book.txt' and sends it to standard output.</li>
                        <li><strong><code>| tr ' ' '\\n'</code></strong>: Takes the output from 'cat', replaces every space character (' ') with a newline character ('\\n'). This puts each word on its own line.</li>
                        <li><strong><code>| sort</code></strong>: Sorts the list of words alphabetically.</li>
                        <li><strong><code>| uniq -c</code></strong>: Counts occurrences of adjacent identical lines (words). The '-c' option prefixes each line with the count of its occurrences.</li>
                        <li><strong><code>| sort -nr</code></strong>: Sorts the output from 'uniq -c'. The '-n' option sorts numerically, and '-r' sorts in reverse (descending) order, so the highest counts come first.</li>
                        <li><strong><code>| head -10</code></strong>: Takes the output from the previous sort and displays only the first 10 lines, which correspond to the 10 most common words.</li>
                    </ol>
                    <p>This powerful combination of simple tools allows for complex text processing tasks.</p>
                `;
    infoDiv.style.display = "block";
    infoDiv.style.borderColor = "#3498db";
  }
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function () {
  setupNumberConverter();
  setupBitwiseOperations();

  // Set initial decimal value and trigger input event
  const decimalInput = document.getElementById("decimal");
  if (decimalInput) {
    decimalInput.value = "42";
    decimalInput.dispatchEvent(new Event("input"));
  }

  // Set initial active navigation button
  const initialSectionId = "numbers"; // Default section
  const initialButton = document.querySelector(
    `.nav-btn[onclick*="${initialSectionId}"]`
  );
  if (initialButton) {
    initialButton.classList.add("active");
  }

  console.log("Computer Science Learning Hub loaded successfully!");
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  if (e.altKey) {
    const shortcuts = {
      1: "numbers",
      2: "cpu",
      3: "os",
      4: "cli",
      5: "nodejs",
      6: "python",
    };

    if (shortcuts[e.key]) {
      e.preventDefault();
      // Simulate a click on the corresponding button
      const targetButton = document.querySelector(
        `.nav-btn[onclick*="${shortcuts[e.key]}"]`
      );
      if (targetButton) {
        targetButton.click(); // This will trigger showSection and update active state
      }
    }
  }
});
