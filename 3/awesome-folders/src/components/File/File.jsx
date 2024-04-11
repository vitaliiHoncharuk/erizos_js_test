import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export class File extends React.Component {
    render() {
        const { name, mimeType } = this.props;
        return (
            <ListItem>
                <InsertDriveFileIcon />
                <ListItemText primary={name} secondary={mimeType} />
            </ListItem>
        );
    }
}

