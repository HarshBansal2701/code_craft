export const getOutput = (output) => {
    const statusId = output?.status?.id;
  
    const decodeBase64 = (encodedStr) => {
      try {
        return atob(encodedStr) || 'No output available.';
      } catch (e) {
        console.error('Error decoding base64:', e);
        return 'Invalid output format.';
      }
    };
  
    if (statusId === 6) { // Compilation error
      return (
        <pre className="px-2 py-1 font-normal text-sm text-red-500">
          {output?.compile_output ? decodeBase64(output.compile_output) : 'Compilation error occurred.'}
        </pre>
      );
    } else if (statusId === 3) { // Finished
      return (
        <>
          {output && (
            <span className="text-[#311a66] font-mono text-m px-2">
              Finished in {parseInt(output.time * 100)} ms
            </span>
          )}
          <pre className="px-2 py-2 font-mono text-m">
            {output?.stdout ? decodeBase64(output.stdout) : 'No output available.'}
          </pre>
        </>
      );
    } else if (statusId === 5) { // Time Limit Exceeded
      return (
        <pre className="px-2 py-1 font-normal text-m text-red-500">
          Time Limit Exceeded
        </pre>
      );
    } else { // Default case for other status codes
      return (
        <pre className="px-2 py-1 font-normal text-m text-red-500">
          {output?.stderr ? decodeBase64(output.stderr) : 'An error occurred.'}
        </pre>
      );
    }
  };
  
  export const statusColor = {
    Running: '#0088cc',
    // You can add more status colors here if needed
  };
  