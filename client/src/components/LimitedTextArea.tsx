import React from "react";
import Button from '@material-ui/core/Button';
import { useTranslation } from "react-i18next";

interface ITextAreaProps {
    rows?: number;
    cols?: number;
    value?: Array<any> | undefined;
    limit?: number;
    tweetText?: string;
}

const LimitedTextarea = ({ tweetText, rows, cols, value, limit }: ITextAreaProps) => {
    const { t } = useTranslation()
    const [content, setContent] = React.useState(tweetText?.slice(0, limit));

    const setTweetText = React.useCallback(
        text => {
            setContent(text.slice(0, limit));
        },
        [limit, setContent]
    );

    return (
        <>
            <div className="textarea">
                <textarea
                    rows={10}
                    cols={120}
                    required
                    value={content}
                    onChange={(e) => setTweetText(e.target.value)}
                    placeholder='Post tweet...'
                >
                </textarea>
                <Button className="btn_post_tweet" variant="contained" color="primary" type="submit">
                    {t('post_tweet')}
                </Button>
                <p className="char_counter">
                    {content?.length}/{limit}
                </p>
            </div>

        </>
    );
};

export default LimitedTextarea;