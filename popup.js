// const text = await navigator.clipboard.readText();
let clipboard = [];
let vocab = {};
let Flag = false;

function addItem(item)
{
    if(clipboard.length===0||item!==clipboard[clipboard.length -1])
    {
        clipboard.push(item);
    }
}
// async await .helps you to write assynchronous code in synchronous manner 

async function getClipboardText()
{
    try{
        const text = await navigator.clipboard.readText();
        // navigator includes methods for interacting with the browser and the device. These methods can be used for tasks like accessing the clipboard, managing service workers, and getting location data.
        return text;
    } catch (err){
        console.error('Failed to read clipboard content:',err);
        return '';
    }
}


// async function saveVocab(){
//     try{
//         const blob = new Blob([JSON.stringify(vocab)],{type:"text/plain"});
//     }
// }



async function main()
{
    while(true)
    {
        clipboard = [];
        vocab = {};
        while (clipboard.length<3)
        {
            console.log('hello')
            let item = await getClipboardText();
            if(item =="done")
            {
                await navigation.clipboard.writeText('');
                Flag = True;
                break;
            }

            addItem();
            await new Promise(resolve => setTimeout(resolve,1000));  //sleep for one second 
        }
        if(Flag)
        {
            break;
        }
        vocab[clipboard[clipboard.length-2]] = clipboard[clipboard.length - 1];
        clipboard = [];
        console.log(vocab);
        writeToFile(vocab);

    }
}

function writeToFile(vocab)
{
    const fs = require('fs');
    fs.appliedFile('vocab.text','\n'+JSON.stringify(vocab).slice(1,-1),function(err){
        if(err) throw err;
        console.log('Saved!');
    });
}

main()