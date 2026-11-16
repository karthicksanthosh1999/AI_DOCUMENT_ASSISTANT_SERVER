import { Request, Response } from "express";
import { AIService } from "./ai.service";
import { APIResponse } from "../../utils/APIResponse";

export class AIController {
  constructor(
    private readonly aiService = new AIService(),
  ) {}

  public ask = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { question } = req.body;

    if (!question) {
      res.status(400).json(
          new APIResponse( "Question is required", 400, null,),
        );
      return;
    }

    const answer =
      await this.aiService.ask(question);

    res.status(200).json(
        new APIResponse("AI response generated successfully", 200,
          {
            question,
            answer,
          },
        ),
      );
  };
}